package main

import (
    "fmt"
    "net/http"

    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
)

type User struct {
    ID       uint   `json:"id" gorm:"primary_key"`
    Username string `json:"username"`
    Password string `json:"password"`
    Token    string `json:"token"`
}

var users []User

func main() {
    router := gin.Default()

    // CORS middleware
    router.Use(cors.Default())

    // Handle user registration
    router.POST("/users", func(c *gin.Context) {
        var user User
        if err := c.BindJSON(&user); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
            return
        }

        // Simulate user ID generation (replace with actual logic)
        user.ID = uint(len(users) + 1)

        // Simulate token generation (replace with actual logic)
        user.Token = fmt.Sprintf("token_for_%s", user.Username)

        // Add user to the in-memory storage
        users = append(users, user)

        // Return the user details
        c.JSON(http.StatusCreated, user)
    })

    // Handle user login
    router.POST("/users/login", func(c *gin.Context) {
        var loginReq struct {
            Username string `json:"username" binding:"required"`
            Password string `json:"password" binding:"required"`
        }
        if err := c.BindJSON(&loginReq); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
            return
        }

        // Find the user by username (simulated database query)
        var user User
        for _, u := range users {
            if u.Username == loginReq.Username && u.Password == loginReq.Password {
                user = u
                break
            }
        }

        if user.ID == 0 {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
            return
        }

        // Return the user's token
        c.JSON(http.StatusOK, gin.H{"token": user.Token})
    })

    router.Run(":8080")
}

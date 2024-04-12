// models/user_test.go

package models

import (
	"testing"

	"github.com/onsi/ginkgo"
	"github.com/onsi/gomega"
)

func TestUser(t *testing.T) {
	RegisterFailHandler(ginkgo.Fail)
	ginkgo.RunSpecs(t, "User Suite")
}

var _ = Describe("User", func() {
	var (
		user *User
		err  error
	)

	BeforeEach(func() {
		user = &User{
			Username: "testuser",
			Password: "testpassword",
			Token:    "testtoken",
		}
	})

	Context("When creating a new user", func() {
		It("should create a user with valid data", func() {
			err = db.Create(user).Error
			Expect(err).NotTo(HaveOccurred())
		})

		It("should fail to create a user with invalid data", func() {
			// Your test logic here
			user.Username = "" // Invalid username
			err = db.Create(user).Error
			Expect(err).To(HaveOccurred())
		})
	})

	Context("When listing users", func() {
		It("should list all users", func() {
			users := []User{}
			err = db.Find(&users).Error
			Expect(err).NotTo(HaveOccurred())
			Expect(len(users)).To(BeNumerically(">", 0))
		})

		It("should handle errors when listing users", func() {
			// Your test logic here
			db.Close() // Simulate database connection error
			users := []User{}
			err = db.Find(&users).Error
			Expect(err).To(HaveOccurred())
		})
	})
})

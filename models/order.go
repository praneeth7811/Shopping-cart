// models/order.go

package models

type Order struct {
	ID     uint   `json:"id" gorm:"primary_key"`
	UserID uint   `json:"user_id"`
	CartID uint   `json:"cart_id"`
	TotalPrice float64 `json:"total_price"`
	Status string `json:"status"`
}

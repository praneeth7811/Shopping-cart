package models

type Cart struct {
	ID     uint   `json:"id" gorm:"primary_key"`
	UserID uint   `json:"user_id"`
	ItemID uint   `json:"item_id"`
	Quantity int  `json:"quantity"`
}
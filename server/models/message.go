package models

import (
	"time"

	"gorm.io/gorm"
)

type Message struct {
	gorm.Model
	From      uint      `json:"from"`
	To        uint      `json:"to"`
	Timestamp time.Time `json:"timestamp"`
	Content   string    `json:"content"`
}

// CreateNewMessage creates a new Message.
//
//	@param m *Message
//	@return error
func CreateNewMessage(m *Message) error {
	err := db.Create(m).Error
	return err
}

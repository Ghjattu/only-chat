package models

import (
	"html"
	"strconv"
	"strings"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// Each user is assigned a unique ChatID,
// and the ChatID is increased by 1 each time.
var chatID int = 100000

type User struct {
	gorm.Model
	ChatID   string `json:"chatid" gorm:"unique;not null"`
	Username string `json:"username" gorm:"size:30;not null"`
	Password string `json:"password" gorm:"size:255;not null"`
}

type APIUser struct {
	ID       uint   `json:"id"`
	ChatID   string `json:"chatid"`
	Username string `json:"username"`
}

// BeforeCreate is a gorm hook that hashes user's password
// and escapes special characters in the user's username.
func (u *User) BeforeCreate(tx *gorm.DB) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	u.ChatID = strconv.Itoa(chatID)
	u.Username = html.EscapeString(strings.TrimSpace(u.Username))
	u.Password = string(hashedPassword)

	return nil
}

// CreateNewUser creates a new user.
func CreateNewUser(u *User) (*APIUser, error) {
	err := db.Create(u).Error
	if err != nil {
		return &APIUser{}, err
	}

	// If a new user is created successfully, then increase the chatID.
	chatID++

	returnedUser := &APIUser{
		ID:       u.ID,
		ChatID:   u.ChatID,
		Username: u.Username,
	}

	return returnedUser, nil
}

// GetUsersByUsername retrieves all users whose username
// matches the specified pattern "%s%".
// Here, the "%" is a wild card which represents zero, one or multiple characters.
func GetUsersByPattern(s string) ([]APIUser, error) {
	pattern := "%" + s + "%"
	users := make([]APIUser, 0)

	err := db.Where("username LIKE ?", pattern).Find(&users).Error
	if err != nil {
		return []APIUser{}, err
	}

	return users, nil
}

// GetUserByID finds a user by ID(not ChatID).
func GetUserByID(id uint) (*User, error) {
	user := &User{}

	err := db.First(user, id).Error
	if err != nil {
		return &User{}, err
	}

	return user, nil
}

// GetUserByChatID finds a user by ChatID.
func GetUserByChatID(chatID string, omitPassword bool) (*APIUser, string, error) {
	user := &User{}

	err := db.Where("chat_id = ?", chatID).First(user).Error
	if err != nil {
		return &APIUser{}, "", err
	}

	returnedUser := &APIUser{
		ID:       user.ID,
		ChatID:   user.ChatID,
		Username: user.Username,
	}

	if omitPassword {
		return returnedUser, "", nil
	}
	return returnedUser, user.Password, nil
}

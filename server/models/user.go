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

// APIUser contains the data returned by the server to the client,
// it omits the user's password.
type APIUser struct {
	ID       uint   `json:"user_id"`
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
//
//	@param user User
//	@return *APIUser
//	@return error
func CreateNewUser(user *User) (*APIUser, error) {
	err := db.Model(&User{}).Create(user).Error
	if err != nil {
		return &APIUser{}, err
	}

	// If a new user is created successfully, then increase the chatID.
	chatID++

	returnedUser := &APIUser{
		ID:       user.ID,
		ChatID:   user.ChatID,
		Username: user.Username,
	}

	return returnedUser, nil
}

// GetUsersByKey retrieves all users whose username
// matches the specified pattern "%key%".
// Here, the "%" is a wild card which represents zero, one or multiple characters.
//
//	@param s string
//	@return []APIUser
//	@return error
func GetUsersByKey(key string) ([]APIUser, error) {
	pattern := "%" + key + "%"
	users := make([]APIUser, 0)

	err := db.Model(&User{}).Where("username LIKE ?", pattern).Find(&users).Error
	if err != nil {
		return []APIUser{}, err
	}

	return users, nil
}

// GetUserByID finds a user by ID(not ChatID).
//
//	@param id uint
//	@return *User
//	@return error
func GetUserByID(id uint) (*APIUser, error) {
	user := &APIUser{}

	err := db.Model(&User{}).Where("id = ?", id).First(user).Error
	if err != nil {
		return &APIUser{}, err
	}

	return user, nil
}

// GetUserByChatID retrieves a user by ChatID.
//
//	@param chatID       string
//	@param omitPassword bool "if omitPassword is true, the function will not return user's password"
//	@return *APIUser
//	@return string "if omitPassword is false, this field will store the user's password"
//	@return error
func GetUserByChatID(chatID string, omitPassword bool) (*APIUser, string, error) {
	user := &User{}

	err := db.Model(&User{}).Where("chat_id = ?", chatID).First(user).Error
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

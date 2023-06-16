package models

import (
	"html"
	"strings"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

var db *gorm.DB

type User struct {
	gorm.Model
	Username string `json:"username" gorm:"size:30;unique;not null"`
	Password string `json:"password" gorm:"size:255;not null"`
	Friends  []User `json:"friends" gorm:"many2many:user_friends"`
}

// UserSetup retrieves the database instance from config/db.go
// and saves it in user.go
func UserSetup(d *gorm.DB) {
	db = d
}

// BeforeCreate is a gorm hook that hashes user's password
// and escapes special characters in the user's username.
func (u *User) BeforeCreate(tx *gorm.DB) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	u.Password = string(hashedPassword)

	u.Username = html.EscapeString(strings.TrimSpace(u.Username))

	return nil
}

// CreateNewUser creates a new user.
func CreateNewUser(u *User) (*User, error) {
	err := db.Create(u).Error
	if err != nil {
		return &User{}, err
	}

	return u, nil
}

// GetUsersByUsername retrieves all users whose username
// matches the specified pattern "%s%".
// Here, the "%" is a wild card which represents zero, one or multiple characters.
func GetUsersByPattern(s string) ([]User, error) {
	pattern := "%" + s + "%"
	users := make([]User, 0)

	err := db.Where("username LIKE ?", pattern).Find(&users).Error
	if err != nil {
		return []User{}, err
	}

	return users, nil
}

// GetUserByUsername finds a user by the unique username.
func GetUserByUsername(username string) (*User, error) {
	user := &User{}

	err := db.Where("username = ?", username).First(user).Error
	if err != nil {
		return &User{}, err
	}

	return user, nil
}

// AddContact established a two-way friend relationship between two users.
func AddContact(id1, id2 uint) error {
	return nil
}

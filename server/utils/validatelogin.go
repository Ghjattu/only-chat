package utils

import (
	"server/models"

	"golang.org/x/crypto/bcrypt"
)

// ValidateLogin validates the user's identity
// and returns the user ID if it passes.
func ValidateLogin(chatID, password string) (uint, error) {
	// Use the chatID to find the specified user because it is unique.
	user, err := models.GetUserByChatID(chatID)
	if err != nil {
		return 0, err
	}

	// Check whether the password is correct.
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return 0, err
	}

	return user.ID, nil
}

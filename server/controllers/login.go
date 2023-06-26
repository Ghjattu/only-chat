package controllers

import (
	"server/utils"

	"github.com/gofiber/fiber/v2"
)

type LoginInput struct {
	ChatID   string `validate:"required,max=10"`
	Password string `validate:"required,max=16"`
}

// Login is a handler for the login endpoint, it will receive a username and password,
// check whether it matches the credential in the database,
// if it does return a token, if it doesn’t return an error response.
func Login(c *fiber.Ctx) error {
	input := &LoginInput{}

	if err := c.BodyParser(input); err != nil {
		return utils.ErrorHandler(c, err)
	}

	errors := utils.ValidateInput(input)
	if errors != nil {
		return c.Status(fiber.StatusBadRequest).JSON(utils.Response{
			Success: false,
			Code:    fiber.StatusBadRequest,
			Message: "the chat id or password violates some constraints",
			Data:    errors,
		})
	}

	user, err := utils.ValidateLogin(input.ChatID, input.Password)
	if err != nil {
		return utils.ErrorHandler(c, err)
	}

	token, err := utils.GenerateToken(user.ID)
	if err != nil {
		return utils.ErrorHandler(c, err)
	}

	return c.JSON(utils.Response{
		Success: true,
		Code:    fiber.StatusOK,
		Message: "login success",
		Data: fiber.Map{
			"user":  user,
			"token": token,
		},
	})
}

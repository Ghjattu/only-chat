package controllers

import (
	"server/models"
	"server/utils"

	"github.com/gofiber/fiber/v2"
)

type RegisterInput struct {
	Username string `validate:"required,max=30"`
	Password string `validate:"required,min=6,max=16"`
}

// Register is a handler for the register endpoint that validates user's input
// and saves it to the database if it passes.
func Register(c *fiber.Ctx) error {
	input := &RegisterInput{}

	if err := c.BodyParser(input); err != nil {
		return utils.ErrorHandler(c, err)
	}

	errors := utils.ValidateInput(input)
	if errors != nil {
		return c.Status(fiber.StatusBadRequest).JSON(utils.Response{
			Success: false,
			Code:    fiber.StatusBadRequest,
			Message: "the username or password violates some constraints",
			Data:    errors,
		})
	}

	user := &models.User{
		Username: input.Username,
		Password: input.Password,
	}
	user, err := models.CreateNewUser(user)
	if err != nil {
		return utils.ErrorHandler(c, err)
	}

	return c.JSON(utils.Response{
		Success: true,
		Code:    fiber.StatusOK,
		Message: "registration success",
		Data:    user,
	})
}

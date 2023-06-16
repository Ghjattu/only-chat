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
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	errors := utils.ValidateInput(input)
	if errors != nil {
		return c.Status(fiber.StatusBadRequest).JSON(errors)
	}

	user := &models.User{
		Username: input.Username,
		Password: input.Password,
	}
	user, err := models.CreateNewUser(user)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.JSON(user)
}

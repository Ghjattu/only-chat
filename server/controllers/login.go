package controllers

import (
	"server/utils"

	"github.com/gofiber/fiber/v2"
)

type LoginInput struct {
	Username string `validate:"required,max=30"`
	Password string `validate:"required"`
}

// Login is a handler for the login endpoint, it will receive a username and password,
// check whether it matches the credential in the database,
// if it does return a token, if it doesn’t return an error response.
func Login(c *fiber.Ctx) error {
	input := &LoginInput{}

	if err := c.BodyParser(input); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	errors := utils.ValidateInput(input)
	if errors != nil {
		return c.Status(fiber.StatusBadRequest).JSON(errors)
	}

	id, err := utils.ValidateLogin(input.Username, input.Password)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	token, err := utils.GenerateToken(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"token": token,
	})
}

package controllers

import (
	"server/models"
	"server/utils"

	"github.com/gofiber/fiber/v2"
)

func GetMessagesByUserID(c *fiber.Ctx) error {
	id1, err := getID(c, "id1")
	if err != nil {
		return utils.ErrorHandler(c, err)
	}

	id2, err := getID(c, "id2")
	if err != nil {
		return utils.ErrorHandler(c, err)
	}

	messages, err := models.GetMessagesByUserID(id1, id2)
	if err != nil {
		return utils.ErrorHandler(c, err)
	}

	return c.JSON(utils.Response{
		Success: true,
		Code:    fiber.StatusOK,
		Message: "success",
		Data:    messages,
	})
}

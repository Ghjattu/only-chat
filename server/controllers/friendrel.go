package controllers

import (
	"server/models"
	"server/utils"

	"github.com/gofiber/fiber/v2"
)

func GetAllFriends(c *fiber.Ctx) error {
	id, err := getID(c, "id")
	if err != nil {
		return utils.ErrorHandler(c, err)
	}

	friends, err := models.GetAllFriendsByID(id)
	if err != nil {
		return utils.ErrorHandler(c, err)
	}

	return c.JSON(utils.Response{
		Success: true,
		Code:    fiber.StatusOK,
		Message: "success",
		Data:    friends,
	})
}

func AddFriend(c *fiber.Ctx) error {
	id1, err := getID(c, "id1")
	if err != nil {
		return utils.ErrorHandler(c, err)
	}

	id2, err := getID(c, "id2")
	if err != nil {
		return utils.ErrorHandler(c, err)
	}

	err = models.AddFriend(id1, id2)
	if err != nil {
		return utils.ErrorHandler(c, err)
	}

	return c.JSON(utils.Response{
		Success: true,
		Code:    fiber.StatusOK,
		Message: "success",
		Data:    nil,
	})
}

package routes

import (
	"server/controllers"

	"github.com/gofiber/fiber/v2"
)

func RegisterRouter(app *fiber.App) {
	api := app.Group("/api")

	RegisterRouterV1(api)

	// websocket router
	app.Get("/ws/:id/:chatid/:username", controllers.WebSocketHandler)
}

func RegisterRouterV1(r fiber.Router) {
	v1 := r.Group("/v1")

	v1.Post("/register", controllers.Register)
	v1.Post("/login", controllers.Login)

	v1.Post("/friends/:id1/:id2", controllers.AddFriend)
	v1.Get("/friends/:id", controllers.GetAllFriends)

	v1.Get("/users/:key", controllers.GetUsersByKey)
	v1.Get("/user/:chatid", controllers.GetUserByChatID)

	v1.Get("/chat/:user_id", controllers.GetChatListByUserID)
	v1.Post("/chat", controllers.AddChatRel)
	v1.Delete("/chat/:id", controllers.DeleteChatRelByID)

	v1.Get("/messages/:user_id/:friend_id", controllers.GetMessagesByUserID)
}

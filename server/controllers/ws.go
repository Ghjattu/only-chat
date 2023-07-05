package controllers

import (
	"os"
	"server/ws"
	"strconv"

	"github.com/gofiber/contrib/websocket"
	_ "github.com/joho/godotenv/autoload"
)

var hub *ws.Hub

func init() {
	size, _ := strconv.Atoi(os.Getenv("MSG_QUEUE_SIZE"))
	if size == 0 {
		size = 100
	}

	hub = ws.NewHub(size)

	go hub.Start()
}

// WebSocketHandler handles the websocket connection.
var WebSocketHandler = websocket.New(func(c *websocket.Conn) {
	defer func() {
		c.Close()
	}()

	// get the route parameters.
	id, err := strconv.Atoi(c.Params("id"))
	chatid := c.Params("chatid")
	username := c.Params("username")
	if err != nil {
		return
	}

	// If this chatid has already established a websocket connection,
	// reject this connection request.
	if hub.CheckConnExist(chatid) {
		return
	}

	client := &ws.Client{
		ID:       uint(id),
		ChatID:   chatid,
		Username: username,
		Conn:     c,
		Hub:      hub,
	}
	hub.Register <- client
	client.Read()
})

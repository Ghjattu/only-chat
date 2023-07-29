package ws

import (
	"log"
	"server/models"

	"github.com/gofiber/contrib/websocket"
)

// Client indicates a user in a websocket connection.
type Client struct {
	ID       uint
	ChatID   string
	Username string
	Conn     *websocket.Conn
	Hub      *Hub
}

// Read listens in for new messages coming through on this client’s websocket connection.
//
//	@receiver c
func (c *Client) Read() {
	defer func() {
		c.Hub.Unregister <- c
		c.Conn.Close()
	}()

	for {
		msg := &models.Message{}

		err := c.Conn.ReadJSON(msg)
		if err != nil {
			log.Println("websocket read error:", err.Error())
			break
		}

		c.Hub.MsgQueue <- msg
	}
}

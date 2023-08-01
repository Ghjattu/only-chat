package redis

import (
	"context"
	"math/rand"
	"sync"
	"time"

	"github.com/redis/go-redis/v9"
)

var Rdb *redis.Client
var Ctx = context.Background()

func InitRdb() {
	Rdb = redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})

	_, err := Rdb.Ping(Ctx).Result()
	if err != nil {
		panic(err)
	}
}

// ListenForChatIDPoolChange listens for the change of chat ID pool.
func ListenForChatIDPoolChange() {
	for {
		// If the size of chat ID pool is less than 100, generate 100 random chat IDs.
		if Rdb.SCard(Ctx, "pool").Val() <= 100 {
			var wg sync.WaitGroup
			wg.Add(1)

			go GenerateRandomChatID(&wg)

			wg.Wait()
		}

		time.Sleep(time.Second * 10)
	}
}

// GenerateRandomChatID generates 100 random chat IDs.
func GenerateRandomChatID(wg *sync.WaitGroup) {
	r := rand.New(rand.NewSource(time.Now().UnixNano()))

	// The range of chat ID is [100000, 999999].
	min := 100000
	max := 999999

	count := 0
	for count < 100 {
		randomChatID := r.Intn(max-min+1) + min

		// If the random chat ID is not in the set of existing chat IDs,
		// then add it to the chat ID pool.
		if !Rdb.SIsMember(Ctx, "exist_chat_ids", randomChatID).Val() {
			Rdb.SAdd(Ctx, "pool", randomChatID)
			count++
		}
	}

	wg.Done()
}

// GetChatIDFromPool returns a random chat ID from the chat ID pool.
func GetChatIDFromPool() string {
	return Rdb.SPop(Ctx, "pool").Val()
}

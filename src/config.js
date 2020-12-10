const config = {
	mongoConnectionOptions: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
		useUnifiedTopology: true,
		reconnectTries: Number.MAX_VALUE,
		reconnectInterval: 500,
		connectTimeoutMS: 10000,
		auth: {
			authSource: "admin"
		},
		user: process.env.MONGO_USERNAME,
		pass: process.env.MONGO_PASSWORD
	},
	mongoDatabse: process.env.MONGO_DB || 'ezserver',
	mongoHost: process.env.MONGO_HOSTNAME || '127.0.0.1',
	mongoPort: process.env.MONGO_PORT || '27017',
	telegramToken: '',
	port: process.env.PORT || 3003,
}

config.mongoConnection = `mongodb://${config.mongoHost}:${config.mongoPort}/${config.mongoDatabse}`

export default config;
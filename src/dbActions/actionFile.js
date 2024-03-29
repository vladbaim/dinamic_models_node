import mongoose from 'mongoose'
import sharp from 'sharp'
import { gfs, upload } from '../utils'

const fileActions = {
	get: ({
		query,
		onSucces = (data) => console.log(data),
		onError = (err) => console.log(err)
	}) => {
		if (!mongoose.Types.ObjectId.isValid(query.id))
			return onError('Not valid _id')
		const stream = gfs.openDownloadStream(new mongoose.Types.ObjectId(query.id)).on('error', err => onError(err))
		if (query.width || query.height)
			return onSucces(stream.pipe(resize(query).on('error', err => onError(err))))
		onSucces(stream)
	},
	create: ({
		onSucces = (data) => console.log(data),
		onError = (data) => console.log(data),
		req,
		res
	}) => {
		upload(req, res, err => {
			if (err) return onError(err)
			onSucces(req.files)
		})
	},
	delete: ({
		id,
		onSucces = (data) => console.log(data),
		onError = (data) => console.log(data)
	}) => {
		if (!mongoose.Types.ObjectId.isValid(id))
			return onError('Not valid _id')
		gfs.delete(new mongoose.Types.ObjectId(id), (err, data) => {
			if (err) return onError(err)
			onSucces({ message: 'File deleted!' })
		})
	}
}

const resize = ({
	width,
	height
}) => {
	return sharp()
		.resize(
			parseInt(width) ? parseInt(width) : null,
			parseInt(height) ? parseInt(height) : null
		)
		.webp()
}

export default fileActions
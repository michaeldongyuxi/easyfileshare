# easyfileshare

## API
1. POST /register
REQUEST:
	{
		email: @String,
		password: @String
	}
RESPONSE:
	{
		success: @Bool
	}

2. POST /login
REQUEST:
	{
		email: @String,
		password: @String
	}
RESPONSE:
	{
		success: @Bool
	}

3. POST /upload
REQUEST:
	{
		file: ImageFile
	}
RESPONSE:
	{
		success: @Bool,
		file_id: @String
	}

4. GET /download/:file_id
RESPONSE:
	file
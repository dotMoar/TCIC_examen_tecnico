CREATE TABLE IF NOT EXISTS posts (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	title VARCHAR(255) NOT NULL,
	description TEXT NOT NULL,
	author_id UUID,
	created_at TIMESTAMPTZ DEFAULT NOW(),
	updated_at TIMESTAMPTZ DEFAULT NOW(),
	deleted_at TIMESTAMPTZ,
	is_deleted BOOLEAN DEFAULT FALSE
);

INSERT INTO
	posts (title, description, is_deleted)
VALUES
	(
		'Primer Post',
		'Este es un post inicial de prueba.',
		FALSE
	),
	(
		'Segundo Post',
		'Otro ejemplo insertado al iniciar el contenedor.',
		FALSE
	);
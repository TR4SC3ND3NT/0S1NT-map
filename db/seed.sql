INSERT INTO User (id, email, password, name, createdAt, updatedAt)
VALUES (
  'user_seed_1',
  'user@example.com',
  '$2b$10$DuQ9ngFkO/ZNzgiNpX/7xuQMkkeD9MWGelNHhHUVxAKGAi/ZUDJoS',
  'Seed User',
  NOW(),
  NOW()
);

INSERT INTO Entity (id, type, name, description, data, x, y, userId, createdAt, updatedAt)
VALUES
(
  'entity_seed_1',
  'person',
  'John Doe',
  'Example person entity',
  '{}'::jsonb,
  0,
  0,
  'user_seed_1',
  NOW(),
  NOW()
),
(
  'entity_seed_2',
  'domain',
  'example.com',
  'Example domain entity',
  '{}'::jsonb,
  100,
  50,
  'user_seed_1',
  NOW(),
  NOW()
);

INSERT INTO Link (id, type, description, sourceId, targetId, userId, createdAt)
VALUES (
  'link_seed_1',
  'owns',
  'Seed link between person and domain',
  'entity_seed_1',
  'entity_seed_2',
  'user_seed_1',
  NOW()
);

INSERT INTO Note (id, content, entityId, userId, createdAt, updatedAt)
VALUES (
  'note_seed_1',
  'This is a seed note attached to John Doe.',
  'entity_seed_1',
  'user_seed_1',
  NOW(),
  NOW()
);
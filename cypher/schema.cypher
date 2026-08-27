CREATE CONSTRAINT developer_id_unique IF NOT EXISTS
FOR (d:Developer)
REQUIRE d.id IS UNIQUE;

CREATE CONSTRAINT skill_id_unique IF NOT EXISTS
FOR (s:Skill)
REQUIRE s.id IS UNIQUE;

CREATE CONSTRAINT project_id_unique IF NOT EXISTS
FOR (p:Project)
REQUIRE p.id IS UNIQUE;

CREATE CONSTRAINT technology_id_unique IF NOT EXISTS
FOR (t:Technology)
REQUIRE t.id IS UNIQUE;

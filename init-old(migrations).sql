CREATE DATABASE account_db
       OWNER "postgres";

CREATE DATABASE notification_db
       OWNER "postgres";

CREATE DATABASE routes_db
       OWNER "postgres";



GRANT ALL PRIVILEGES ON DATABASE account_db TO "postgres";
GRANT ALL PRIVILEGES ON DATABASE notification_db TO "postgres";
GRANT ALL PRIVILEGES ON DATABASE routes_db TO "postgres";
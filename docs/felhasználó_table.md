# User table

Column name     | Type          | Description
------------    | ------------- | -------------
felhasználónév  | string        | **user** - the nickname of the user, *must be unique*
út              | int           | **road** - foreign key, it connects the user and roads table
teljes név      | int           | **name** - the users's name
bankkártya      | string        | **card number** - the user's card data
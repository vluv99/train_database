# seat table

Column name     | Type          | Description
------------    | ------------- | -------------
id              | int           | **identifier**
típus           | int           | **type** - seat's type
asztal          | int (boolean) | **desk** - is there any desk in fron of the seat?
ablak           | int (boolean) | **window** - is there a window next to the seat?
kocsi           | int           | **car's ID** - foreign key to the [*kocsi*_table](https://github.com/vluv99/train_database/blob/master/docs/kocsi_table.md)


### típus
Value | Meaning
------ | ----- 
1      | leather
2      | wood
3      | textile
# schedule table

Column name     | Type               | Description
------------    | -------------      | -------------
id              | int                | **identifier** - auto increment
ismétlődés      | int                | **repetition** - the type of the repetition
név             | string             | **train's name** - nickname for the train, so the users can easily remember *(eg.: "Stormy")*
indulási idő    | (time/string) date | **depart time** - the train's depart time *(eg.: 06:00)*
hét napja       | int                | **weekdays** - specifies the day

This table contains the schedule individually for each train. This table with the [*Megallo*_table]() will contain fully when and where the trains go.

## Types:

### ismétlődés
Value | Meaning
------ | ----- 
1      | These trains go every day
2      | These trains go on every week on the day specified in `hét napja`

### hét napja
Value | Meaning
------ | ----- 
1      | Monday
2      | tuesday
3      | wednesday
4      | Thursday
5      | friday
6      | saturday
7      | sunday
-1     | not specified



## Examples:

id      | ismétlődés | név      | indulási idő | hét napja       
------- | ---------- | -------- | ------------ | ----------
0       | 1          | STORMY   | 15:30:00     | -1
1       | 2          | WHEATLEY | 08:00:00     | 1
2       | 2          | WILLY    | 12:35:00     | 6
3       | 1          | SUNNY    | 10:30:00     | -1 

ID

0. The first train has the name `STORMY` and sets off at 15:30 each day. This is because the `ismétlődés` is set to 1 witch means it is a daily train. In these cases the `hét napja` is set to `-1` to indicate that it is not tied to a certain day.

1. The seccond train has the name `WHEATLEY` and sets off at 8:00 each Monday. This is because the `ismétlődés` is set to 2 witch means it repeats on each day specified in the `hét napja` field witch in this case is set to `1` meaning Monday.
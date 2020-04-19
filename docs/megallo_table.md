# stop table

Column name     | Type               | Description
------------    | -------------      | -------------
id              | int                | **identifier** - auto increment
állomás         | int                | **station** - the ID of the station
járat           | int                | **route** - the Id of the route *(utak_table)*
idő             | (time/string) date | **delta time** - *(eg.: 00:00; 02:32)*

This table describes the stops a train takes on a schedule.

Delta time is the time passed since the train started (and not the absolute time as we don't know when exaclty the train started). This time should start at 00::00 marking the start station, and go up by the time it takes to get to the next stations.

The trains arrival time shows if the train is starting at that station or it is just a stop. 
 - 00:00 - means it is the starting station, it haven't been on the road for any minutes yet. 
 - 02:32 - means it's been on the road for 2 hours 32 minutes when it arrives to that station, so its a stop.

## Example

Állomás | Szeged | Szatymaz | Kistelek | Kecskemét | Cegléd | Zugló | Budapest-Nyugati  
------- | ------ | -------- | -------  | --------- |  ----- | ----- | ---------
Idő     | 00:00  | 00:15    | 00:30    | 01:16     | 01:50  | 02:05 | 02:35     


This table references [*menetrend*_table](https://github.com/vluv99/train_database/blob/master/docs/menetrend_table.md), to complete the train's scedule.
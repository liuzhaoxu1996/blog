# MySQL笔记

## SHOW语句

```sql
-- 列出服务器管理的数据库
SHOW DATABASES

-- 显示当前选定的数据库中的所有表
SHOW TABLES 

-- 显示"customers"表中的列
SHOW columns FROM customers 
```

## SELECT语句（划重点划重点）

```sql
-- 从table1表中，选取3列数据
SELECT column_1, column_2, column_3 FROM table1;

-- *通配符，表示所有。选取table1表中的所有列
SELECT * FROM table1;

-- distinct用于返回唯一值，去掉重复记录
SELECT DISTINCT column_1, column_2 FROM table1;

-- limit限定子集范围。选取table1表中前6条记录
SELECT * FROM table1 LIMIT 6;

-- 选取table1表中从第3条开始的前10个结果
SELECT * FROM table1 LIMIT 2, 10; 

-- 列名前提供表名，用点分隔。完全限定名称
SELECT table1. column_1 FROM table1;

-- order by关键字默认按升序ASC排序
SELECT * FROM table1 ORDER BY column_1;

-- 按DESC降序排序
SELECT * FROM table1 ORDER BY column_1 DESC;

-- 多列排序，先按列1，再按列2
SELECT * FROM table1 ORDER BY column_1, column_2;

-- 从customers表中选择ID为6的记录
SELECT * FROM customers WHERE ID=6;

-- 选取ID介于2和6之间的记录
SELECT * FROM customers WHERE ID BETWEEN 2 AND 6;

-- 选取ID为3,4,6的记录
SELECT * FROM customers WHERE ID IN(3,4,6);

-- 单引号环绕文本值，选取London相关的记录
SELECT * FROM customers WHERE City=’London’;

-- AND语句
SELECT * FROM customers WHERE City=’London’AND state=’CA’;

-- 结合AND和OR
SELECT * FROM customers WHERE City=’London’AND (Age=25 OR Age=28);

-- 算术运算符+，为员工工资加500
SELECT ID, Salary+500 AS Salary FROM employees; 

-- concat()函数用于连接两个或多个文本值，并返回连接字符串。把FirstName与City连接起来，用逗号分隔
SELECT CONCAT (FirstName,’,’,City）FROM customers;

-- 执行输出结果：
-- CONCAT (FirstName,’,’,City）
-- John, New York

SELECT CONCAT (FirstName,’,’,City） AS new_column FROM customers;
--  （AS关键字为列自定义名称）
--   执行输出结果：
--   new_column
--   John, New York
```

## LIKE操作符

- LIKE操作符用于在WHERE子句中搜索列中的指定模式。

- SQL模式允许使用“_”匹配任何单个字符，而使用“%”匹配任意数目字符（包括零个字符）。

```sql
-- 案例：选择FirstName以字母“D”开头的所有员工：
SELECT * FROM employees WHERE FirstName LIKE ‘D%’;

-- 案例：选择LastName以字母“s”结尾的所有员工：
SELECT * FROM employees WHERE LastName LIKE ‘%s’;
```

## 函数

- UPPER()函数：将指定字符串中的所有字母转换为大写。（Smith>>SMITH）
- LOWER()函数：将指定字符串中的所有字母转换为小写。（Smith>>smith）
- SQRT()：平方根。 
- AVG()：平均值。 
- SUM():求和。 
- MIN():最小值。

```sql
-- 案例
SELECT FirstName, UPPER(LastName) AS LastName FROM employees;

SELECT Salary, SQRT(Salary) FROM employees;
```

## 子查询 

- 当一个查询是另一个查询的条件时，称之为子查询。

```sql

-- 例如: 

SELECT * FROM items WHERE cost>500 ORDER BY cost DESC;

SELECT Salary FROM employees WHERE Salary > (SELECT AVG(Salary) FROM employees);
```

## 表连接：

- 组合来自两个或对个表的数据。表连接创建一个临时表，显示连接表中的数据。

```sql
-- 案例：连接 customers表和orders表

SELECT customers.ID, customers.Name, orders.Name, orders.Amount FROM customers, orders WHERE customers.ID=orders.Customer_ID ORDER BY customers.ID;
```

## 自定义别名：AS

```sql

SELECT ct. ID, ct. Name, ord. Name, ord. Amount FROM customers AS ct, orders AS ord WHERE ct. ID=ord. Customer_ID ORDER BY customers.ID;

```

## 连接

JOIN操作符：横向连接。又分内连接和外连接。

![](https://pic1.zhimg.com/80/v2-691b4d6a0943d8787513c03ae520b55c_720w.jpg)

案例：有三个表如下：

![](https://pic3.zhimg.com/80/v2-1aae90b9e337d177c0742220e574cac6_720w.jpg)

内连接：SELECT * FROM user_1, user_2 WHERE user_1.id = user_2.id

![](https://pic3.zhimg.com/80/v2-2609d6b0c4ade35aa128b9691381648a_720w.jpg)

左外连接：SELECT * FROM user_1 LEFT OUTER JOIN user_2 ON user_1.id = user_2.id

![](https://pic2.zhimg.com/80/v2-0ba1df491e12c6ab95573240184746b9_720w.jpg)

三个表左外连接：SELECT * FROM user_1 LEFT OUTER JOIN user_2 ON user_1.id = user_2.id LEFT OUTER JOIN user_3 ON user_1.id = user_3.id

![](https://pic1.zhimg.com/80/v2-14763f6cd7edbc15f4d217d144eae36c_720w.jpg)

右外连接：SELECT * FROM user_1 RIGHT OUTER JOIN user_2 ON user_1.id = user_2.id

![](https://pic4.zhimg.com/80/v2-fb8cc00acd9bbd1e4cacc836b1e5523f_720w.jpg)

全外连接：SELECT * FROM user_1 FULL OUTER JOIN user_2 ON user_1.id = user_2.id

![](https://pic2.zhimg.com/80/v2-ed6c0ecb6d93d28e671e6de6c69afab9_720w.jpg)


- UNION操作符：纵向连接
- UNION 将多个数据集合并到单个数据集中，并删除任何现有的重复项。
- UNION ALL将多个数据集合并到一个数据集中，但不会删除重复的行。
- UNION ALL比UNION运行速度快，因为它不会对数据集执行重复删除操作。
- UNION 内部每个SELECT语句必须拥有相同数量的列。列也必须拥有相似的数据类型。
- 同时，每个SELECT语句中的列的顺序必须相同。

```sql
-- 案例：
SELECT ID, City FROM table1 UNION SELECT ID, City FROM table2; -- 不包括重复值
SELECT ID, City FROM table1 UNION ALL SELECT ID, City FROM table2; -- 包括重复值
```

- CREATE TABLE语句：创建表

```sql
CREATE TABLE uesrs ( UserID int, FirstName varchar(100), LastName varchar(100), City varchar(100); PRIMARY KEY(UserID));
```

- SQL约束：约束可在创建表时规定

- NOT NULL：指示某列不能存储NULL值。

- UNIQUE：保证每列的每行必须有唯一值。

- PRIMARY KEY：NOT NULL和UNIQUE的结合。主键。

- FOREIGN KEY：保证一个表中的数据匹配另一个表中的值的参照完整性。

- CHECK：保证列中的值符合指定的条件。

- DEFAULT：规定没有给列赋值时的默认值。

- AUTO INCREMENT：自动递增，插入新记录时，自动创建主键字段的值。

```sql

-- 案例 

UserID int NOT NULL AUTO_INCREMENT, PRIMARY KEY (UserID)

CREATE TABLES users (id int NOT NULL AUTO_INCREMENT, username varchar(40) NOT NULL, password varchar(10) NOT NULL, PRIMARY KEY(id) );
```


- INSERT INTO语句：用于向数据库中的表添加新的数据行。

```sql
案例：向Employees表中插入新的一行信息。

INSERT INTO Employees VALUES (6, ‘Andrew’, ‘Thomas’, 43);

INSERT INTO Employees( ID, FirstName, LastName, Age) VALUES (6, ‘Andrew’, ‘Thomas’, 43); （指定表列名后，再插入数据）
```

- ALTER TABLE:用于在已有的表中添加、删除或修改列。

```sql
-- 案例：给"people"表中添加一个名为"Birthday"的列
ALTER TABLE people ADD Birthday date;

-- 案例：删除“Birthday”列
ALTER TABLE people DROP COLUMN Birthday;

-- 将“FirstName”列重命名为“name”
ALTER TABLE people CHANGE FirstName name varchar(55);
```

- UPDATE语句：更新表中记录

```sql
-- 案例: WHERE子句规定哪条记录需要更新，如果省略WHERE子句，所有记录都将被更新！
UPDATE Employees SET Salary=6000 WHERE ID=1;

-- 案例: 逗号分隔，更新多列
UPDATE Employees SET Salary=5500, FirstName=’Robert’WHERE ID=1;
```

- RENAME语句: 重命名

```sql
-- 把 peple 表重命名为 users
RENAME TABLE people TO users;
```


- DELETE 语句：删除表中记录

```sql
-- WHERE子句规定哪条记录需要删除，如果省略WHERE子句，所有记录都将被删除！
DELETE FROM Employees WHERE ID=1;

-- 删除整个表
DROP TABLE people；
```

- SQL视图：是基于SQL语句的结果集的可视化的表。视图包含行和列，就像一个真实的表。

```sql
-- 案例：创建一个视图List，显示每个员工的“FirstName”和“Salary”。

CREATE VIEW List AS SELECT FirstName, Salary FROM Employees;

-- 可以像查询实际表一样查询列表视图：

SELECT * FROM List;

DROP VIEW:删除视图。

DROP VIEW List;
```

## 附录

Mysql支持的数据类型有哪些？

![](https://pic3.zhimg.com/v2-df1f7edc6cd183dbd50fbba6aff19bf6_r.jpg)

SQL语句中，创建一个数据表时create table user{user_id int unsigned};

当中的unsigned表示，数据项user_id恒为正整数。例如如果tinyint最大是127，那tinyint unsigned最大就可以到 127 * 2。unsigned 属性只针对整型，而binary属性只用于char 和varchar。

SQL运算符

![](https://pic4.zhimg.com/80/v2-4b13face8f1bdabe224792b5e745cae7_720w.jpg)

UTF-8和GBK有什么区别
GBK编码专门用来解决中文编码的，是双字节的。不论中英文都是双字节的。
UTF－8 编码是用以解决国际上字符的一种多字节编码，它对英文使用一个字节，中文使用三个字节来编码。

## 使用MySQL数据库

```sql
-- 创建名为samp的数据库, 字符编码指定为gbk
Create database samp character set gbk;

-- 查看已经创建的数据库（类似的，查看表：show tables; 。Describe表名: 查看已创建表的详细信息）
Show databases;

-- 指定要使用的数据库：
Use samp;

-- 创建表students: 
Create table students ( id int unsigned not null auto_increment 
 primary key, name char(8) not null, Sex char(4) not null, age tinyint unsigned not
 null, tel char(13) null default ‘-’);

-- 向表中插入数据：
insert into students values(NULL, ‘王刚‘,‘男’,20, ‘13811223344’)；

-- 查询表中数据：
select * from students;

-- 更新表中数据：将所有人年龄增加1：
Update students set age=age+1;

-- 在表的最后追加列address：
Alter table students add address char(60);

-- 在名为age的列后插入列birthday
Alter table students add birthday date after age;

-- 修改列，将表tel列改名为telphone。
Alter table studengts change tel telphone char(13) default ‘-’;

-- 将name列的数据类型改为char(16)。
Alter table students change name name char(16) not null;

-- 重命名students表为workmates。
Alter table students rename workmates;

-- 删除列birthday
Alter table workmates drop birthday;

-- 删除表中数据：删除id为1的行
delete from workmates where id=1;

-- 删除表中所有数据
delete from workmates;

-- 删除表
Drop table workmates;

-- 删除整个数据库
Drop database samp;

-- 输入exit或quit退出登录。
```

- [MySQL Workbench导入csv文件](https://zhuanlan.zhihu.com/p/27019458)
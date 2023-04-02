ALTER PROCEDURE [dbo].[Orders_GetFilter]
	@Page INT,
	@Limit INT,
	@Ids nvarchar(255),
	@Statuses varchar(max),
	@AccountIds nvarchar(255),
	@Query nvarchar(255),
	@CreatedAtMin Datetime,
	@CreatedAtMax Datetime,
	@ModifiedAtMin Datetime,
	@ModifiedAtMax Datetime,
	@ReturnedAtMin Datetime,
	@ReturnedAtMax Datetime
AS
BEGIN
	if @Ids is not null if replace(@Ids,N' ',N'')=N'' set @Ids=null;
	if @Statuses is not null if replace(@Statuses,N' ',N'')=N'' set @Statuses=null;
	if @AccountIds is not null if replace(@AccountIds,N' ',N'')=N'' set @AccountIds=null;
	if @Query is not null if replace(@Query,N' ',N'')=N'' set @Query=null;

	DECLARE @sql nvarchar(max) ='', @cond nvarchar(max) ='',
		@join nvarchar(max) ='',  
		@space nvarchar(10)=' ', 
		@empty nvarchar(10)='', 
		@comma nvarchar(10)=',',
   		@selectClause nvarchar(max) = ''

		set @sql +='SELECT Orders.* from Orders '

		IF @Query is not null
		BEGIN
			set @cond += ' inner join Users ON Orders.AccountId = Users.Id '
		END
		set @cond += ' Where 1=1 '
		IF @Ids is not null
		BEGIN
			set @cond += ' AND Orders.Id in (select items from dbo.Split(@Ids, '','')) '
		END
		IF @Statuses IS NOT NULL 
		BEGIN
			set @cond += ' AND Orders.Status in (select items from dbo.Split(@Statuses, '','')) '
		END
		IF @AccountIds IS NOT NULL 
		BEGIN
			set @cond += ' AND Orders.AccountId in (select items from dbo.Split(@AccountIds, '',''))  '
		END
		IF @CreatedAtMin IS NOT NULL 
		begin
			--SET @CreatedOnMin = CONVERT(VARCHAR(250),@CreatedOnMin,110)
			SET @cond += ' and Orders.CreatedAt >= @CreatedAtMin '
		end
		
		IF @CreatedAtMax IS NOT NULL 
		begin
			--SET @CreatedOnMax = CONVERT(VARCHAR(250),@CreatedOnMax,110)
			SET @cond += ' and Orders.CreatedAt <= @CreatedAtMax '
		end
		IF @ModifiedAtMin IS NOT NULL 
		begin
			--SET @CreatedOnMax = CONVERT(VARCHAR(250),@CreatedOnMax,110)
			SET @cond += ' and Orders.ModifiedAt <= @ModifiedAtMin '
		end

		IF @ModifiedAtMax IS NOT NULL 
		begin
			--SET @CreatedOnMin = CONVERT(VARCHAR(250),@CreatedOnMin,110)
			SET @cond += ' and Orders.ModifiedAt >= @ModifiedAtMax '
		end

		IF @ReturnedAtMin IS NOT NULL 
		begin
			--SET @CreatedOnMax = CONVERT(VARCHAR(250),@CreatedOnMax,110)
			SET @cond += ' and Orders.ReturnedAt <= @ReturnedAtMin '
		end

		IF @ReturnedAtMax IS NOT NULL 
		begin
			--SET @CreatedOnMin = CONVERT(VARCHAR(250),@CreatedOnMin,110)
			SET @cond += ' and Orders.ReturnedAt >= @ReturnedAtMax '
		end
		Set @cond += ' and Orders.Status != ''deleted''  '
		IF @Query IS NOT NULL 
		BEGIN
			set @cond += ' AND CONCAT(Users.Name, '' , Users.Email, '' , Users.Username) like N''%'+@Query+'%''  '
		END
		set @cond +=' order by Orders.Id desc OFFSET @Limit * (@Page - 1) ROWS FETCH NEXT @Limit ROWS ONLY ';
			
		set @sql += @selectClause + @cond 
	--print @sql

	exec sp_executesql @sql, 
	N'
	@Limit int,
	@Page int,
	@Ids nvarchar(255),
	@Statuses varchar(max),
	@AccountIds nvarchar(255),
	@Query nvarchar(255),
	@CreatedAtMin Datetime,
	@CreatedAtMax Datetime,
	@ModifiedAtMin Datetime,
	@ModifiedAtMax Datetime,
	@ReturnedAtMin Datetime,
	@ReturnedAtMax Datetime
	',
	@Limit,
	@Page,
	@Ids,
	@Statuses,
	@AccountIds,
	@Query,
	@CreatedAtMin,
	@CreatedAtMax,
	@ModifiedAtMin,
	@ModifiedAtMax,
	@ReturnedAtMin,
	@ReturnedAtMax
END
ALTER FUNCTION Split_String(@String nvarchar(max), @Delimiter char(1))       
    returns @temptable TABLE (items nvarchar(max))       
    as       
    begin       
        declare @idx int       
        declare @slice nvarchar(max)       
          
        select @idx = 1       
            if len(@String)<1 or @String is null  return       
          
        while @idx!= 0       
        begin       
            set @idx = charindex(@Delimiter,@String)       
            if @idx!=0
                set @slice = left(@String,@idx - 1)       	
            else       
                set @slice = @String  
				
				     
              
            if(len(@slice)>0)  
			BEGIN
				DECLARE @SlideTemp NVARCHAR(MAX) = N''''+@slice+''''
                insert into @temptable(Items) values(@SlideTemp)       
			END
            set @String = right(@String,len(@String) - @idx)       
            if len(@String) = 0 break       
        end   
    return       
    end
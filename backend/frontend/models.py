from django.db import connections
from django.db import models

class Userprofile(models.Model): 
	Id = models.CharField(max_length=250)
	User_Name = models.CharField(max_length=250)
	Role_Name = models.CharField(max_length=250)
	First_Name = models.CharField(max_length=250)
	Last_Name = models.CharField(max_length=250)
	Description = models.CharField(max_length=250)
	class Meta:
		db_table = "users"
		
		
class Rolelist(models.Model): 
	Id = models.CharField(max_length=250)
	Role_Name = models.CharField(max_length=250)
	Description = models.CharField(max_length=250)	
	Roles = models.CharField(max_length=250)
	class Meta:
		db_table = "list_roles"


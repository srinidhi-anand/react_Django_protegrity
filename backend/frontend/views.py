from django.shortcuts import render
from frontend.models import Userprofile, Rolelist
from django.http import HttpResponse
from django.core import serializers
from itertools import chain
from django.db.models import Max
from rest_framework.decorators import api_view
import json


def Show(request):
	Roles = Rolelist.objects.all()
	data = serializers.serialize('json', Roles)
	return HttpResponse(data, content_type="application/json")


def lists(request):
	users = Userprofile.objects.all()
	data = serializers.serialize('json', users)
	return HttpResponse(data, content_type="application/json")
	
	
def userdetail(request, poll_id):
	users = Userprofile.objects.filter(User_Name=str(poll_id))
	return HttpResponse(serializers.serialize('json', users), content_type="application/json")
	
	
def roledetail(request, poll_id):
	users = Userprofile.objects.filter(User_Name=str(poll_id))
	for Role in users:
		roles = Rolelist.objects.filter(Role_Name=str(Role.Role_Name))
		
	#Roleslists = Rolelist.objects.all()
	#result_list = list(chain(Roleslists, roles))
	return HttpResponse(serializers.serialize('json', roles), content_type="application/json")
	
@api_view(['GET','POST'])
def formdetails(request):
	count = 0
	print(request.method,'------------REQUESUT----------',request.body)
	if request.method == 'POST': 
		data = json.loads(request.body.decode('utf-8'))
		username = data.get('User_Name')
		print(username,'------------username----------',data)
		try:
			users = Userprofile.objects.get(User_Name=str(username))
			if users:
				users.Description = data.get('Description')
				users.save()
				print('Updated')
		except:
			res = Userprofile.objects.filter().aggregate(max_id=Max('Id'))
			try:
				count = int(res.get('max_id'))+1 
			except:
				count = 0
			print('Created'+str(int(count)))
			data.update({'Id':int(count)})
			u = Userprofile(**data)
			u.save()
		return HttpResponse(data)
	else:
		return HttpResponse({'status':'Not ok'})
		

@api_view(['GET','POST'])
def deletedata(request):
	print(request.method,'------------DELETE----------',request.body)
	if request.method == 'POST': 
		data = json.loads(request.body.decode('utf-8'))
		username = data.get('Users')
		print(username,'------------Userrrr----------',data)
		try:
			users = Userprofile.objects.get(User_Name=str(username))
			if users:
				print('deleted')
				users.delete()
		except:
			print('Delete not available!')
		return HttpResponse(data)
	else:
		return HttpResponse({'status':'Not Deleted'})

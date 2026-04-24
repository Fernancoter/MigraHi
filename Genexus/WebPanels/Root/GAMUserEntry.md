# WebPanel: GAMUserEntry

- **Module:** Root
- **Description:** User 
- **GAM Object:** Yes

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| WWPUserExtendedPhotoExtension | Variable | VARCHAR |  | WWPUser Extended Photo Extension |
| WWPUserExtended | Variable | GX_BUSCOMP |  | WWPUser Extended |
| WWPUserExtendedPhoto | Variable | BINARY |  | WWPUser Extended Photo |
| ActivationDate | Variable | DATETIME |  | Activation Date |
| AuthenticationType | Variable | GX_EXTERNAL_OBJECT |  | Authentication Type |
| AuthenticationTypeName | Variable | CHARACTER |  | Authentication Type Name |
| AuthenticationTypes | Variable | GX_EXTERNAL_OBJECT |  | Authentication Types |
| AuthenticationTypesIns | Variable | GX_EXTERNAL_OBJECT |  | Authentication Types Ins |
| AuthTypeId | Variable | CHARACTER |  | Auth Type Id |
| Birthday | Variable | DATE |  | Birthday |
| BlobPhoto | Variable | BINARY |  | Blob Photo |
| CannotChangePassword | Variable | Boolean |  | Cannot Change Password |
| DateLastAuthentication | Variable | DATETIME |  | Date Last Authentication |
| DontReceiveInformation | Variable | Boolean |  | Dont Receive Information |
| Email | Variable | VARCHAR |  | Email |
| EnableTwoFactorAuthentication | Variable | Boolean |  | Enable two factor authentication? |
| Error | Variable | GX_EXTERNAL_OBJECT |  | Error |
| Errors | Variable | GX_EXTERNAL_OBJECT |  | Errors |
| ExternalId | Variable | VARCHAR |  | External Id |
| FilterSecPol | Variable | GX_EXTERNAL_OBJECT |  | Filter Sec Pol |
| FirstName | Variable | CHARACTER |  | First Name |
| GAMRepository | Variable | GX_EXTERNAL_OBJECT |  | GAMRepository |
| Gender | Variable | CHARACTER |  | Gender |
| Image | Variable | BITMAP |  | Image |
| IsActive | Variable | Boolean |  | Is Active |
| IsBlocked | Variable | Boolean |  | Is Blocked |
| IsEnabledInRepository | Variable | Boolean |  | Is Enabled In Repository |
| isOK | Variable | Boolean |  | is OK |
| Language | Variable | CHARACTER |  | Language |
| LastName | Variable | CHARACTER |  | Last Name |
| LinkURL | Variable | VARCHAR |  | Link URL |
| Message | Variable | GX_SDT |  | Message |
| Messages | Variable | GX_SDT |  | Messages |
| MustChangePassword | Variable | Boolean |  | Must Change Password |
| Name | Variable | VARCHAR |  | Name |
| OTPDailyNumberCodes | Variable | NUMERIC |  | Number of daily OTP codes requested |
| OTPLastDateRequestCode | Variable | DATE |  | Last date requested a OTP code |
| OTPLastLockedDate | Variable | DATETIME |  | Last time OTP code is locked |
| OTPNumberLocked | Variable | NUMERIC |  | Number of locked OTP codes |
| Password | Variable | CHARACTER |  | Password |
| PasswordConf | Variable | CHARACTER |  | Password Conf |
| PasswordIsOK | Variable | Boolean |  | Password Is OK |
| PasswordNeverExpires | Variable | Boolean |  | Password Never Expires |
| Phone | Variable | CHARACTER |  | Phone |
| Photo | Variable | BITMAP |  | Photo |
| Repository | Variable | GX_EXTERNAL_OBJECT |  | Repository |
| SecurityPolicies | Variable | GX_EXTERNAL_OBJECT |  | Security Policies |
| SecurityPolicy | Variable | GX_EXTERNAL_OBJECT |  | Security Policy |
| SecurityPolicyId | Variable | NUMERIC |  | Security Policy Id |
| String | Variable | VARCHAR |  | String |
| URLProfile | Variable | VARCHAR |  | URLProfile |
| User | Variable | GX_EXTERNAL_OBJECT |  | User |
| UserActivationKey | Variable | CHARACTER |  | User Activation Key |
| UserId | Variable | CHARACTER |  | User Id |
| UserNameSpace | Variable | CHARACTER |  | User Name Space |
| IsAuthorized | Variable | Boolean |  | Is Authorized |
| SecurityFunctionalityKeys | Variable | VARCHAR |  | Security Functionality Keys |
| CheckRequiredFieldsResult | Variable | Boolean |  | Check Required Fields Result |
| CompanyId | Variable | NUMERIC |  | Company Id |
| CompanyId_Data | Variable | GX_SDT |  | Company Id_Data |
| Combo_DataItem | Variable | GX_SDT |  | Combo_Data Item |
| GAMUserAttribute | Variable | GX_EXTERNAL_OBJECT |  | GAMUser Attribute |
| Att_isOK | Variable | Boolean |  | Att_is OK |
| GAMError | Variable | GX_EXTERNAL_OBJECT |  | GAMError |
| OperadorId | Variable | NUMERIC |  | Operador Id |
| OperadorId_Data | Variable | GX_SDT |  | Operador Id_Data |
| Today | Variable | DATE |  | Today |
| Time | Variable | CHARACTER |  | Time |
| Pgmname | Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Start (Event)

```genexus
&GAMRepository = GAMrepository.Get()
	If &GAMRepository.AuthenticationMasterRepositoryId.IsEmpty()
		//User Authentication Type
		&AuthenticationTypeName.Clear()
		&AuthenticationTypes = GAMRepository.GetEnabledAuthenticationTypes(&Language, &Errors)
		For &AuthenticationTypesIns in &AuthenticationTypes
			&AuthenticationTypeName.AddItem(&AuthenticationTypesIns.Name, &AuthenticationTypesIns.Description)
		EndFor
	Else
		&AuthenticationTypeName.Visible = False
	Endif
	//User Security Policy
	&SecurityPolicies = GAMRepository.GetSecurityPolicies(&FilterSecPol, &Errors)
	&SecurityPolicyId.AddItem(0,"(None)")
	For &SecurityPolicy in &SecurityPolicies
		&SecurityPolicyId.AddItem(&SecurityPolicy.Id,&SecurityPolicy.Name)
	EndFor
	If &Mode = GAMAPiMode.Insert		
		&IsEnabledInRepository.Enabled	= False
		&AuthenticationTypeName.Enabled = True
		&AuthenticationTypeName 		= !"local"			
		&AuthTypeId = &AuthenticationType.GetTypeByName(&AuthenticationTypeName, &Errors)
		&Repository 		  			=  GAMRepository.Get()
		&UserNameSpace 		  			= &Repository.NameSpace			
		&EnableTwoFactorAuthentication	= False
		UserPhoto.Visible = False
	Else
		// Mode = Update
		&User.Load(&UserId)
		&AuthenticationTypeName.Enabled = False
		&AuthenticationTypeName 		= &User.AuthenticationTypeName			
		&AuthTypeId = &AuthenticationType.GetTypeByName(&AuthenticationTypeName, &Errors)
		If &AuthTypeId = GAMAuthenticationTypes.GAMLocal
			&Name.Enabled 				= True
			&Image.Enabled 				= True
			&URLProfile.Enabled			= False			
		Else			
			&Name.Enabled 				= False
			&Image.Enabled 				= False
			&URLProfile.Enabled 		= True
		Endif
		&UserId		    = &User.GUID
		&UserNameSpace  = &User.NameSpace
		&Name 			= &User.Name
		&EMail	 		= &User.EMail
		&FirstName 		= &User.FirstName
		&LastName		= &User.LastName
		If not &User.URLImage.IsEmpty()
			&Image.FromURL(&User.URLImage)
		Endif
		//&Photo.FromURL(&User.GetPhoto(&Errors))	
		&ExternalId				= &User.ExternalId
		&Birthday				= &User.Birthday
		&Gender					= GAMUserGender.Convert(&User.Gender)
		&Phone					= &User.Phone
		&IsActive 				= &User.IsActive
		
		
		&GamUserAttribute = &User.GetAttribute("CompanyId", &Errors)
		&CompanyId  = &GamUserAttribute.Value.ToNumeric()
		
		&GamUserAttribute = &User.GetAttribute("OperadorId", &Errors)
		&OperadorId  = &GamUserAttribute.Value.ToNumeric()
		
		
		&ActivationDate			= &User.ActivationDate
		&DontReceiveInformation = &User.DontReceiveInformation
		&CannotChangePassword 	= &User.CannotChangePassword
		&MustChangePassword 	= &User.MustChangePassword
		&PasswordNeverExpires 	= &User.PasswordNeverExpires
		&IsBlocked  			= &User.IsBlocked
		&SecurityPolicyId 		= &User.SecurityPolicyId
		&IsEnabledInRepository	= &User.IsEnabledInRepository
		&DateLastAuthentication	= &User.DateLastAuthentication
		&EnableTwoFactorAuthentication 	= &User.EnableTwoFactorAuthentication
		&OTPDailyNumberCodes			= &User.OTPDailyNumberCodes
		&OTPLastDateRequestCode			= &User.OTPLastDateRequestCode
		&OTPLastLockedDate				= &User.OTPLastLockedDate
		&OTPNumberLocked				= &User.OTPNumberLocked
		&WWPUserExtended.Load(&User.GUID)
		IF &WWPUserExtended.Success()
			If &WWPUserExtended.WWPUserExtendedPhoto.ImageURI <> ''
				UserPhoto.FromURL(&WWPUserExtended.WWPUserExtendedPhoto.ImageURI)
			Else
				UserPhoto.Visible = False
			EndIf
		Else
			UserPhoto.Visible = False
		EndIf
	Endif
	If &Mode = GAMAPiMode.Display or &Mode = GAMAPiMode.Delete
		&Name.Enabled 		= False
		&EMail.Enabled 		= False
		&FirstName.Enabled 	= False
		&LastName.Enabled 	= False
		&URLProfile.Enabled	= False
		&ExternalId.Enabled = False		
		&Birthday.Enabled 	= False
		&Gender.Enabled 	= False
		&Phone.Enabled		= False
		&IsActive.Enabled	= False
		&DontReceiveInformation.Enabled = False
		&CannotChangePassword.Enabled 	= False
		&MustChangePassword.Enabled 	= False
		&IsBlocked.Enabled				= False
		&PasswordNeverExpires.Enabled 	= False
		&SecurityPolicyId.Enabled 		= False	
		&IsEnabledInRepository.Enabled	= False
		If &EnableTwoFactorAuthentication
			&EnableTwoFactorAuthentication.Enabled 	= False
			&OTPDailyNumberCodes.Enabled			= False
			&OTPLastDateRequestCode.Enabled			= False
			&OTPLastLockedDate.Enabled				= False
			&OTPNumberLocked.Enabled				= False
		Endif
		If &Mode = GAMAPiMode.Delete
			BtnEnter.Caption 	= "WWP_GAM_Delete"
		Else
			BtnEnter.Visible 	= False
		EndIf
		&WWPUserExtendedPhoto.Enabled = False
	Endif
	If &IsActive 
		&IsActive.Enabled 	= False
	Endif
	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	&OperadorId.Visible = False
	&CompanyId.Visible = False
	Do 'LoadComboCompanyId'
	Do 'LoadComboOperadorId'
	Do 'AttributesSecurityCode'
	User_IsEnabledInRepository.Visible = False
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

### Refresh (Event)

```genexus
/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	Do 'CheckSecurityForActions'
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

### 'DoSendActivationEmail' (Event)

```genexus
&User.Load(&UserId)
	If not &User.IsActive
		&UserActivationKey = &User.GetNewActivationKey(&Errors)
		Commit
		&LinkURL = GAMRepository.ApplicationGetAccountActivationURL("")
		GAMCheckUserActivationMethod(&UserId, &LinkURL, &Messages)
		For &Message in &Messages
			Msg(&Message.Description)
		EndFor
	Endif
	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

### 'DoUrlProfileGo' (Event)

```genexus
Link(&URLProfile)
	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

### Combo_OperadorId.OnOptionClicked (Event)

```genexus
/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	&OperadorId.FromString(Combo_OperadorId.SelectedValue_get)
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

### Combo_CompanyId.OnOptionClicked (Event)

```genexus
/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	&CompanyId.FromString(Combo_CompanyId.SelectedValue_get)
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

### Enter (Event)

```genexus
Do 'CheckRequiredFields'
	If &CheckRequiredFieldsResult
	  If &Mode <> TrnMode.Insert
		  &User.Load(&UserId)
	  Endif
	  &PasswordIsOK = True
	  Do Case
	  Case &Mode = GAMAPiMode.Insert or &Mode = GAMAPiMode.Update 
		  If &Mode = GAMAPiMode.Insert
			  &AuthTypeId = &AuthenticationType.GetTypeByName(&AuthenticationTypeName, &Errors)
			  &IsEnabledInRepository = true
			  If &AuthTypeId = GAMAuthenticationTypes.GAMLocal
				  If &Password <> &PasswordConf
					  &PasswordIsOK = False
					  Msg("WWP_GAM_PasswordNotMatch")
				  Endif
			  Else
				  &Password = NullValue(&Password)
			  Endif
		  Endif
		  If &PasswordIsOK			
			  &User.AuthenticationTypeName = &AuthenticationTypeName
			  &User.Name			= &Name
			  &User.EMail			= &EMail
			  &User.FirstName		= &FirstName
			  &User.LastName		= &LastName		
			  &User.Password		= &Password
			  &User.ExternalId	= &ExternalId
			  &User.Birthday		= &Birthday
			  &User.Phone			= &Phone
			  &User.Gender.FromString(&Gender)			
			  &User.IsActive		= &IsActive
			  &BlobPhoto 			= &Photo		
			  //&User.SetPhoto(&BlobPhoto, &Errors)					
			  &User.URLProfile			= &URLProfile
			  &User.DontReceiveInformation= &DontReceiveInformation
			  &User.CannotChangePassword	= &CannotChangePassword
			  &User.MustChangePassword	= &MustChangePassword
			  &User.IsBlocked				= &IsBlocked
			  &User.PasswordNeverExpires	= &PasswordNeverExpires
			  &User.SecurityPolicyId		= &SecurityPolicyId
			  &User.EnableTwoFactorAuthentication = &EnableTwoFactorAuthentication
			  &User.Save()
		  Endif
	  Case &Mode = GAMAPiMode.Delete
		  &User.Delete()
	  EndCase
	  If &PasswordIsOK
		  If &User.Success()
			  
			  &GAMUserAttribute.Id = "CompanyId"
			  &GAMUserAttribute.Value = &CompanyId.ToFormattedString()
			  &Att_isOK = &User.SetAttribute(&GAMUserAttribute,&Errors)
			  
			  &GAMUserAttribute.Id = "OperadorId"
			  &GAMUserAttribute.Value = &OperadorId.ToFormattedString()
			  &Att_isOK = &User.SetAttribute(&GAMUserAttribute,&Errors)
			  
  				Do Case
					Case &Mode = GAMAPiMode.Insert
						WWP_CreateUserExtended(&User.GUID, &WWPUserExtendedPhoto)
					Case &Mode = GAMAPiMode.Update
						WWP_UpdateUserExtendedPhoto(&User.GUID, &WWPUserExtendedPhoto)
				EndCase
			  Commit
			  &isOK = True
			  If &Mode <> GAMAPiMode.Insert
				  If &IsEnabledInRepository <> &User.IsEnabledInRepository
					  If &IsEnabledInRepository
						  &isOK = &User.RepositoryEnable(&Errors)
					  Else
						  &isOK = &User.RepositoryDisable(&Errors)
					  EndIf
				  EndIf
			  EndIf
			  If &isOK
				  commit
				  If &Mode = GAMAPiMode.Delete
					  GAMWWUsers()
				  Else
					  Return	
				  EndIf
			  Else
				  For &Error in &Errors
					  Msg(Format(!"%1 (GAM%2)", &Error.Message, &Error.Code))
				  EndFor
			  EndIf			
		  Else
			  &Errors = &User.GetErrors()
			  For &Error in &Errors
				  Msg(Format(!"%1 (GAM%2)", &Error.Message, &Error.Code))
			  EndFor
		  Endif
	  Endif
  Endif
```

### &WWPUserExtendedPhoto.ControlValueChanged (Event)

```genexus
&CheckRequiredFieldsResult = True
	Do 'CheckExtensionImage'
	If &CheckRequiredFieldsResult
		If &WWPUserExtendedPhoto <> ''
			UserPhoto.Visible = False
		EndIf
	EndIf
```

### &AuthenticationTypeName.IsValid (Event)

```genexus
&AuthTypeId = &AuthenticationType.GetTypeByName(&AuthenticationTypeName, &Errors)
	Do 'AttributesSecurityCode'
```

### Rules (Rules)

```genexus
/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
parm(&Mode, &UserId);
/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
// Parm(&Mode, &UserId);
```


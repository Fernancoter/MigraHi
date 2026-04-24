# Procedure: DVMessageGetAdvancedNotificationMsg

- **Module:** WWPBaseObjects
- **Description:** DVMessage Get Advanced Notification
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| AnimateSpeed | Variable | NUMERIC |  | Animate Speed Milliseconds |
| AnimationEffectIn | Variable | CHARACTER |  | Animation Effect In |
| AnimationEffectOut | Variable | CHARACTER |  | Animation Effect Out |
| ButtonCloseLabel | Variable | CHARACTER |  | Button Close Label |
| ButtonCloserEnable | Variable | CHARACTER |  | Button Closer Enable |
| ButtonCloserHoverEnable | Variable | CHARACTER |  | Button Closer Hover Enable |
| ButtonsShowOnNonBlock | Variable | CHARACTER |  | Buttons Show On Non Block |
| ButtonStickerEnable | Variable | CHARACTER |  | Button Sticker Enable |
| ButtonStickerHoverEnable | Variable | CHARACTER |  | Button Sticker Hover Enable |
| ButtonStickerLabel | Variable | CHARACTER |  | Button Sticker Label |
| ControlSelector | Parameter | CHARACTER | in | Control Selector |
| IsDesktopNotification | Parameter | CHARACTER | in | Is Desktop Notification |
| DesktopNotificationFallBackEnable | Variable | CHARACTER |  | Desktop Notification Fall Back Enable |
| DesktopNotificationIconUrl | Parameter | VARCHAR | in | Desktop Notification Icon Url |
| DesktopNotificationTag | Variable | VARCHAR |  | Desktop Notification Tag |
| Hide | Parameter | CHARACTER | in | Hide |
| HideDelayMilliseconds | Variable | NUMERIC |  | Hide Delay Milliseconds |
| HideMouseReset | Variable | CHARACTER |  | Hide Mouse Reset |
| MessageCornerClass | Variable | CHARACTER |  | Message Corner Class |
| MinHeight | Variable | NUMERIC |  | Min Height |
| NonBlockEnable | Variable | CHARACTER |  | Non Block Enable |
| NonBlockOpacity | Variable | NUMERIC |  | Non Block Opacity |
| Opacity | Variable | NUMERIC |  | Opacity |
| Parms | Parameter | VARCHAR | out | Parms |
| ShadowVisible | Variable | CHARACTER |  | Shadow Visible |
| StylingType | Variable | CHARACTER |  | Styling Type |
| Text | Parameter | CHARACTER | in | Text |
| TextEscape | Variable | CHARACTER |  | Text Escape |
| Title | Parameter | CHARACTER | in | Title |
| TitleEscape | Variable | CHARACTER |  | Title Escape |
| Type | Parameter | CHARACTER | in | Type |
| Width | Variable | NUMERIC |  | Width |
| ClickRedirectURL | Parameter | VARCHAR | in | Click Redirect URL |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |
| Page | Standard Variable | NUMERIC |  | Page |
| Line | Standard Variable | NUMERIC |  | Line |
| Output | Standard Variable | CHARACTER |  | Output |

## Business Logic

### Source (Source)

```genexus

//All default settings plus History and Stack options are retrieved from UC properties.

&Parms = !'{'
If not &Title.IsEmpty()
	&Parms += !'"title":"' + &Title.Replace(!'"',!'').Trim() + !'",'
EndIf
If not &Text.IsEmpty()
	&Parms += !'"text":"' + &Text.Replace(!'"',!'').Trim() + !'",'
EndIf
If &Type <> DVMessageType.noSpecIfy
	&Parms += !'"type":"' + &Type.ToString() + !'",'
EndIf
If not &ControlSelector.IsEmpty()
	&Parms += !'"att":"' + iif(&ControlSelector.Trim().StartsWith(!'#'), '', !'#') + &ControlSelector.Replace(!'"',!'').Trim() + !'",'
EndIf
//If not &Width.IsEmpty()
//	&Parms += !'"width":"' + &Width.ToString().Trim() + !'",'
//EndIf
//If not &MinHeight.IsEmpty()
//	&Parms += !'"min_height":"' + &MinHeight.ToString().Trim() + !'",'
//EndIf
//If &StylingType <> DVMessageStyling.NoSpecIfy
//	&Parms += !'"styling":"' + &StylingType.Trim() + !'",'
//EndIf
//If &ShadowVisible <> DVMessageBoolean.NoSpecIfy
//	&Parms += !'"shadow":' + &ShadowVisible.ToString().Trim() + !','
//EndIf
//If not &Opacity.IsEmpty()	
//	&Parms += !'"opacity":"' + &Opacity.ToString().Substring(2,2).Trim() + !'",'
//EndIf

If &Hide <> DVMessageBoolean.NoSpecIfy
	&Parms += !'"hide":' + &Hide.ToString().Trim() + !','
EndIf
//If not &HideDelayMilliseconds.IsEmpty()
//	&Parms += !'"delay":"' + &HideDelayMilliseconds.ToString().Trim() + !'",'
//EndIf
//If &HideMouseReset <> DVMessageBoolean.NoSpecIfy
//	&Parms += !'"mouse_reset":' + &HideMouseReset.ToString().Trim() + !','
//EndIf
//
//If &TitleEscape <> DVMessageBoolean.NoSpecIfy
//	&Parms += !'"title_escape":' + &TitleEscape.ToString().Trim() + !','
//EndIf
//If &TextEscape <> DVMessageBoolean.NoSpecIfy
//	&Parms += !'"text_escape":' + &TextEscape.ToString().Trim() + !','
//EndIf
//
//If not &MessageCornerClass.IsEmpty()
//	&Parms += !'"cornerclass":"' + &MessageCornerClass.Trim() + !'",'
//EndIf

If not &ClickRedirectURL.IsEmpty()
	&Parms += !'"clickUrl":"' + &ClickRedirectURL.Trim() + !'",'
EndIf

////animation group
//If &AnimationEffectIn <> DVMessageEffect.NoSpecIfy or &AnimationEffectOut <> DVMessageEffect.NoSpecIfy
//	&Parms += !'"animation": {'
//	
//	If &AnimationEffectIn <> DVMessageEffect.NoSpecIfy
//		&Parms += !'"effect_in":"' + &AnimationEffectIn.ToString().Trim() + !'",'
//	EndIf
//	If &AnimationEffectOut <> DVMessageEffect.NoSpecIfy
//		&Parms += !'"effect_out":"' + &AnimationEffectOut.ToString().Trim() + !'",'
//	EndIf
//
//	&Parms += !'},'
//EndIf
//
//If not &AnimateSpeed.IsEmpty()
//	&Parms += !'"animate_speed":"' + &AnimateSpeed.ToString().Trim() + !'",'
//EndIf
//
////buttons group
//If &ButtonCloserEnable <> DVMessageBoolean.NoSpecIfy or &ButtonCloserHoverEnable <> DVMessageBoolean.NoSpecIfy
//	or &ButtonStickerEnable <> DVMessageBoolean.NoSpecIfy or &ButtonStickerHoverEnable <> DVMessageBoolean.NoSpecIfy
//	or &ButtonsShowOnNonBlock <> DVMessageBoolean.NoSpecIfy
	
//	&Parms += !'"buttons": {'
//	
//		If &ButtonCloserEnable <> DVMessageBoolean.NoSpecIfy
//			&Parms += !'"closer":' + &ButtonCloserEnable.ToString().Trim() + !','
//		EndIf
//		If &ButtonCloserHoverEnable <> DVMessageBoolean.NoSpecIfy
//			&Parms += !'"closer_hover":' + &ButtonCloserHoverEnable.ToString().Trim() + !','
//		EndIf
//	
//		If &ButtonStickerEnable <> DVMessageBoolean.NoSpecIfy
//			&Parms += !'"sticker":' + &ButtonStickerEnable.ToString().Trim() + !','
//		EndIf
//		If &ButtonStickerHoverEnable <> DVMessageBoolean.NoSpecIfy
//			&Parms += !'"sticker_hover":' + &ButtonStickerHoverEnable.ToString().Trim() + !','
//		EndIf
//		If &ButtonsShowOnNonBlock <> DVMessageBoolean.NoSpecIfy
//			&Parms += !'"show_on_nonblock":' + &ButtonsShowOnNonBlock.ToString().Trim() + !','
//		EndIf
//	
//		If not &ButtonCloseLabel.IsEmpty() or not &ButtonStickerLabel.IsEmpty()
//			//label subgroup
//			&Parms += !'"labels": {'
//			
//			If not &ButtonCloseLabel.IsEmpty()
//				&Parms += !'"close":"' + &ButtonCloseLabel.Trim() + !'",'
//			EndIf
//			If not &ButtonStickerLabel.IsEmpty()
//				&Parms += !'"stick":"' + &ButtonStickerLabel.Trim() + !'",'
//			EndIf
//		
//			&Parms += !'}'
//		EndIf
//
//	&Parms += !'},'
//EndIf
//
////NonBlock group
//If &NonBlockEnable <> DVMessageBoolean.NoSpecIfy or not &NonBlockOpacity.IsEmpty()
//	&Parms += !'"nonblock": {'
//	
//		If &NonBlockEnable <> DVMessageBoolean.NoSpecIfy
//			&Parms += !'"nonblock":' + &NonBlockEnable.ToString().Trim() + !','
//		EndIf
//		If not &NonBlockOpacity.IsEmpty()	
//			&Parms += !'"nonblock_opacity":"' + &NonBlockOpacity.ToString().Substring(2,2).Trim() + !'",'
//		EndIf
//	
//	&Parms += !'},'
//EndIf

//Desktop group
If &IsDesktopNotIfication <> DVMessageBoolean.NoSpecIfy 
	or not &DesktopNotIficationIconUrl.IsEmpty()
//	or &DesktopNotIficationFallBackEnable <> DVMessageBoolean.NoSpecIfy 
//	or not &DesktopNotIficationTag.IsEmpty()
	
	&Parms += !'"desktop": {'
	
//		If &DesktopNotIficationFallBackEnable <> DVMessageBoolean.NoSpecIfy
//			&Parms += !'"fallback":' + &DesktopNotIficationFallBackEnable.ToString().Trim() + !','
//		EndIf
//		If not &DesktopNotIficationTag.IsEmpty()	
//			&Parms += !'"tag":"' + &DesktopNotIficationTag.Trim() + !'",'
//		EndIf
		If &IsDesktopNotIfication <> WWPBaseObjects.DVMessageBoolean.NoSpecIfy
			&Parms += !'"desktop":' + &IsDesktopNotIfication.ToString().Trim() + !','
		EndIf
		If not &DesktopNotIficationIconUrl.IsEmpty()	
			&Parms += !'"icon":"' + &DesktopNotIficationIconUrl.Trim() + !'",'
		EndIf
	
	&Parms += !'}'
EndIf

&Parms += !'}'
```

### Rules (Rules)

```genexus

parm(in:&Title, in:&Text, in:&Type, in:&ControlSelector, in:&Hide, in:&IsDesktopNotification, in:&DesktopNotificationIconUrl, in:&ClickRedirectURL,	out:&Parms);
```


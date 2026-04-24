# DataProvider: WWP_LoadTreeViewSampleData

- **Module:** WWPBaseObjects
- **Description:** WWP_Load Tree View Sample Data
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Id | Variable | NUMERIC |  | Id |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
TreeNodeCollection
{
	&Id = 1
	TreeNode
	{
		Id = &Id.ToString()
		&Id = &Id + 1
		Name = !"Root"
		Expanded = True
		Nodes
		{
			TreeNode
			{
				Id = &Id.ToString()
				&Id = &Id + 1
				Name = !"Option 1"
				Expanded = True
				Nodes
				{
					TreeNode
					{
						Id = &Id.ToString()
						&Id = &Id + 1
						Name = !"Option 1.1"
					}
					TreeNode
					{
						Id = &Id.ToString()
						&Id = &Id + 1
						Name = !"Option 1.2"
						Nodes
						{
							TreeNode
							{
								Id = &Id.ToString()
								&Id = &Id + 1
								Name = !"Option 1.2.1"
							}
							TreeNode
							{
								Id = &Id.ToString()
								&Id = &Id + 1
								Name = !"Option 1.2.2"
							}
						}
					}
				}
			}
			TreeNode
			{
				Id = &Id.ToString()
				&Id = &Id + 1
				Name = !"Option 2"
				Expanded = True
				Nodes
				{
					TreeNode
					{
						Id = &Id.ToString()
						&Id = &Id + 1
						Name = !"Option 2.1"
					}
					TreeNode
					{
						Id = &Id.ToString()
						&Id = &Id + 1
						Name = !"Option 2.2"
					}
				}
			}
			TreeNode
			{
				Id = &Id.ToString()
				&Id = &Id + 1
				Name = !"Option 3"
				Expanded = True
				Nodes
				{
					TreeNode
					{
						Id = &Id.ToString()
						&Id = &Id + 1
						Name = !"Option 3.1"
					}
					TreeNode
					{
						Id = &Id.ToString()
						&Id = &Id + 1
						Name = !"Option 3.2"
					}
					TreeNode
					{
						Id = &Id.ToString()
						&Id = &Id + 1
						Name = !"Option 3.3"
					}
				}
			}
			TreeNode
			{
				Id = &Id.ToString()
				&Id = &Id + 1
				Name = !"Option 4"
				Expanded = False
				Nodes
				{
					TreeNode
					{
						Id = &Id.ToString()
						&Id = &Id + 1
						Name = !"Option 4.1"
					}
					TreeNode
					{
						Id = &Id.ToString()
						&Id = &Id + 1
						Name = !"Option 4.2"
					}
				}
			}
		}
	}
}
```


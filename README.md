# Tag Data Into Ticket Field

This app can be used to have macros set values to ticket fields of the following types, something that isn't natively supported in Zendesk:

* textfield
* multi-line
* numeric
* decimal
* regex

### Installation

1. Install the app. 
2. Specify which ticket field id you want populated
3. Optionally change the regex field to control how tags should be matched. 

### Usage 

After installing it, here's how you move data into your custom ticket field. 

1. Have the macro add a tag matching your regex. E.g: 'prefix:my_data', if you are using the default regex. 
2. When the macro is applied and the tag is added, the data part of the tag (my data) will be moved to your target field, and the tag removed. 

### Options

#### Target ticket field ID

Enter your custom ticket field ID here. E.g. 25785521, for custom_field_25785521.  

#### Tag data identifier (regex)

The default matching pattern is `^prefix:([^\s]+)$`. Given an array of tags 'prefix:some_tag other_tag', this would pick up the 'prefix:some_tag' tag, and move data into the the target field using the 'some_tag' as the data portion. 

Another matching pattern could be: `^([^\s]+):price$`, to move '1234:price' as '1234'.

If you install the app multiple times to move data into different custom ticket fields, you should of course use different patterns for each installation. So the first installation could use `^price:([^\s]+)$`, the second `^resolution:([^\s]+)$`, etc.

#### Convert underscores

When transferring tag data to a custom field, convert underscores to spaces, so that prefix:Some_data will be moved as 'some data', instead of 'some_data'. Could make sense if you move data into text fields.

### User Interface

This app runs in the background, in the ticket sidebar. It doesn't have a user interface.

### FAQ

Because this is a very simple app, the answer to most questions is probably 'No'.  

**Can I update date fields with this app?**
No
 
**Can I add values like +1**
No

**Can I append values to fields?**
No, the target field value is replaced - not appended. 

**What happens if I have multiple tags matching a pattern?**
If you add tags like 'prefix:data1 prefix:data2', then the last one will win, so 'data2' will be set, though all prefix:tags will be removed from the tag field.   

**Can I use the app to pull data into multiple fields?**
You can install the app multiple times if you want.

**Can I transfer data with tags through automations or triggers with this app?**
No. If you want to set ticket fields values that cannot be set natively in Zendesk using triggers or automations, this app doesn't offer a solution.

The app only supports moving data through tags via macros. As such, the app will only parse tags while tags field is updated while working on a ticket. The app won't try to parse the existing ticket tags, if you happen across a ticket that has a matching tag. This is because the user would then need to save the ticket to apply the changes, and I think that would be confusing. 

### Feedback

Please submit bug reports to [Joel Hellman](mailto:Joel.Hellman@tre.se). Pull requests are welcome.

### Screenshot(s):

[put your screenshots down here.]

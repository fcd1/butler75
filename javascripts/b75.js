function xmlhttpPost(id,formName, strURL) {
    var xmlHttpReq = false;
    var self = this;

   // required fields
    var butler75_project_name = escape(document.forms[formName].butler75_project_name.value);
    var butler75_project_desc = escape(document.forms[formName].butler75_project_desc.value);
    var post_author = escape(document.forms[formName].post_author.value);
    var post_subject = escape(document.forms[formName].post_subject.value);
    var post_message = escape(document.forms[formName].post_message.value);

	if (post_author == "") {
		post_author = escape("Anonymous");
	}
        if (post_subject == "") {
		alert('You must provide a subject or topic.');
		document.getElementById("post_subject").style.border="1px solid #ff0000";
		return;	
	}
	if (post_message == "") {
		alert('You  must provide a message.');
		document.getElementById("post_message").style.border="1px solid #ff0000";
		return;
	}

	strURL = 'https://ldpd.lamp.columbia.edu/phpBB3/' + strURL + '.php?butler75_project_name=' + butler75_project_name + '&butler75_project_desc=' + butler75_project_desc + '&post_author=' + post_author + '&post_subject=' + post_subject + '&post_message=' + post_message;

    if (window.XMLHttpRequest) { // Mozilla/Safari
        self.xmlHttpReq = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) { // IE
        self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
    }
    try {
	//alert("going to " + strURL);
        self.xmlHttpReq.open("GET", strURL, true);
    } catch (e) {
      alert(e);
    }

    self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    self.xmlHttpReq.onreadystatechange = function() {
        if (self.xmlHttpReq.readyState == 4) {
		//alert('made it!');
		updatepage(id,self.xmlHttpReq.responseText);
        }
    };
    self.xmlHttpReq.send(null);
} // end FUNCTION xmlhttpPost

// this function does all the work of parsing the response and updating the page.
function updatepage(id,str){
	//alert('str = ' + str);
  	var rsp = eval('(' + str + ')'); // use eval to parse phpbb JSON response
  	var forum_id = rsp.forum_id; 
	//alert('got a forum id' + forum_id);

  // if we're here, things were okay...? TODO 
  	document.getElementById("commentbox").style.display="none";
  	document.getElementById("result").innerHTML="Thank you for your story.  Check back soon to see yours and other Butler stories online!";
	document.getElementById("result").style.display="block";
  	if (document.getElementById("commentmsg"))
  		document.getElementById("commentmsg").style.display="none";
	return true;
}

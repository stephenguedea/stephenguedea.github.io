"use strict";

// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e) {
    // Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteURL').value;

    if (!validdateForm(siteName, siteUrl)){
        return false;
    }

    if (!validURL(siteName, siteUrl)) {
        alert("The URL entered is not correct");
        return false;
    }



    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    // // Local Storage Test - only stores strings!
    // localStorage.setItem('test', 'Hello World');
    //
    // // to get an item
    // console.log(localStorage.getItem('test'));
    //
    // // delete from storage
    // localStorage.removeItem('test');
    // console.log(localStorage.getItem('test'));


    // Test if bookmarks is null
    if(localStorage.getItem('bookmarks') === null){
        // Init array
        var bookmarks = [];

        // Add to array
        bookmarks.push(bookmark);

        // Set to LocalStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); // JSON.stringify turns JSON into a string
    } else {
        // Get bookmarks from LocalStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); // JSON.parse turns a string into JSON

        // Add bookmark to array
        bookmarks.push(bookmark);

        // Re-set back to LocalStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); // JSON.stringify turns JSON into a string


    }

    // Clear form
    document.getElementById('myForm').reset();

    // Re-fetch bookmarks
    fetchBookmarks();

    // Prevent form from submitting
    e.preventDefault();
}

// Delete Bookmark

function deleteBookmark(url) {
    // console.log(url);

    // Get bookmarks from LocalStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); // JSON.parse turns a string into JSON

    // Loop through bookmarks
    for(var i= 0; i < bookmarks.length; i++){
        if(bookmarks[i].url === url){
            // Remove from array
            bookmarks.splice(i, 1);
        }
    }
    // Re-set back to LocalStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); // JSON.stringify turns JSON into a string

    // Re-fetch bookmarks
    fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks() {
    // Get bookmarks from LocalStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); // JSON.parse turns a string into JSON

    // Get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    // Build output
    bookmarksResults.innerHTML = '';
    for(var i = 0; i <bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="bg-dark">'+
                                        '<p class="text-white">' +name+
                                        ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
            ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'+

            '</p>'+
                                        '</div>';
    }

}

// Validateform
function validdateForm(siteName, siteUrl) {
    if (!siteName || !siteUrl){
        alert('Please fill the form');
        return false;
    }

    // Regular expression for URL
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please use a valid URL');
        return false;
    }

    return true;
}

// ValidURL
function validURL(siteName, siteUrl) {
    if (siteUrl.includes(siteName.toLowerCase())) {
        return true;
    }
}
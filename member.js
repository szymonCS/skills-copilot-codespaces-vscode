function skillsMember() {
    var member = {
        name: 'John Doe',
        skills: ['JavaScript', 'HTML', 'CSS'],
        age: 25
    };

    // Loop through the member object
    for (var key in member) {
        // Check if the key is skills
        if (key === 'skills') {
            // Loop through the skills array
            for (var i = 0; i < member[key].length; i++) {
                console.log(member[key][i]);
            }
        }
    }
}
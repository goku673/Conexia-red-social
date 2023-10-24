import React from 'react';

const UserProfile = () => {
    return (
        <div className="min-h-screen bg-color1 flex">
          <div className="w-1/4 bg-color2 p-4">
            <div className="flex items-center space-x-4">
              <img className="h-16 w-16 rounded-full" src="path_to_your_image" alt="User avatar" />
              <div>
                <h2 className="text-color5">User Name</h2>
                <button className="bg-color6 text-color7 rounded p-2">Edit Profile</button>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-color8">Your Posts</h3>
              {/* Map over your posts here */}
            </div>
          </div>
          <div className="w-1/2 bg-color3 p-4">
            <h2 className="text-color9">Feed</h2>
            {/* Map over the feed posts here */}
          </div>
          <div className="w-1/4 bg-color4 p-4">
            <h2 className="text-color10">Messages</h2>
            {/* Map over your messages here */}
          </div>
        </div>
      );
}

export default UserProfile;
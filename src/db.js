let users = [
    {
      id: 'AJD064',
      name: 'Aakash',
      age: 30,
      gpa: 3.2,
      isEmployed: true,
      comments: [],
    },
    {
      id: 'AJD874',
      name: 'Joey',
      age: 50,
      gpa: 9,
      isEmployed: false,
      comments: ['C-0945', 'C-09452', 'C-09453'],
    },
    {
      id: 'AJD862',
      name: 'Chandler',
      age: 45,
      gpa: null,
      isEmployed: true,
      comments: ['C-996311', 'C-99206', 'C-992069', 'C-992068'],
    },
    {
      id: 'AJD864',
      name: 'Monica',
      age: 40,
      gpa: 3.2,
      isEmployed: false,
      comments: ['C-2', 'C-1', 'C-3'],
    },
  ];
  
  let posts = [
    {
      id: 'AJDK98',
      title: 'Test Post 1',
      body: 'Body of pOst 1',
      published: true,
      author: 'AJD862',
      comments: ['C-1', 'C-992067', 'C-992068', 'C-992069']
    },
    {
      id: 'AJDK9534',
      title: 'Test Post 2',
      body: 'Body of pOst 1',
      published: true,
      author: 'AJD862',
      comments: ['C-2', 'C-874514', 'C-99206']
    },
    {
      id: 'AJDK98u38',
      title: 'Sample Post 1',
      body: 'Body of pOst 2',
      published: true,
      author: 'AJD874',
      comments: ['C-3', 'C-874513', 'C-996311']
    },
    {
      id: 'AJDK98724c',
      title: 'Sample Post 2',
      body: 'Body of pOst 4',
      published: true,
      author: 'AJD064',
      comments: ['C-1', 'C-0945', 'C-09452', 'C-09453', 'C-874512']
    },
  ];

  let comments = [
    {
      id: 'C-1',
      text: 'Joey is a Rockstar 1',
      author: 'AJD864',
      post: 'AJDK98'
    },
    {
      id: 'C-2',
      text: 'Joey is a Rockstar 1',
      author: 'AJD864',
      post: 'AJDK9534',
    },
    {
      id: 'C-3',
      text: 'Joey is a Rockstar 1',
      author: 'AJD864',
      post: 'AJDK98u38',
    },
    {
      id: 'C-0945',
      text: 'Joey is a Rockstar 1',
      author: 'AJD874',
      post: 'AJDK98724c'
    },
    {
      id: 'C-09452',
      text: 'Joey is a Rockstar 2',
      author: 'AJD874',
      post: 'AJDK98724c'
    },
    {
      id: 'C-09453',
      text: 'Joey is a Rockstar 3',
      author: 'AJD874',
      post: 'AJDK98'
    },
  
    {
      id: 'C-874512',
      text: 'Chandler is a Bae',
      author: 'AJD064',
      post: 'AJDK98'
    },
    {
      id: 'C-874513',
      text: 'Chandler is a Bae',
      author: 'AJD064',
    },
    {
      id: 'C-874514',
      text: 'Chandler is a Bae',
      author: 'AJD064',
    },
    {
      id: 'C-992067',
      text: 'Charlie wins ALL',
      author: 'AJD862',
      post: 'AJDK9534',
    },
    {
      id: 'C-992068',
      text: 'Charlie wins ALL',
      author: 'AJD862',
      post: 'AJDK9534',
    },
    {
      id: 'C-992069',
      text: 'Charlie wins ALL',
      author: 'AJD862',
      post: 'AJDK98u38',
    },
    {
      id: 'C-99206',
      text: 'Charlie wins ALL',
      author: 'AJD862',
      post: 'AJDK98u38',
    },
    {
      id: 'C-996311',
      text: 'Couldnt do it without Alan',
      author: 'AJD862',
      post: 'AJDK98u38',
    },
  ];

  const db = {
    users,
    posts,
    comments
  };

  export {db as default};
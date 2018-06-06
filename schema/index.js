const { makeExecutableSchema } = require('graphql-tools');
const { find, filter } = require('lodash');

const typeDefs = `

  type Author {
    id: Int!
    firstName: String
    lastName: String
    """
    the list of Posts by this author
    """
    posts: [Post]
  }

  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
  }

  # the schema allows the following query:
  type Query {
    pages: [Page]

    posts: [Post]
    author(id: Int!): Author
  }

  # this schema allows the following mutation:
  type Mutation {
    upvotePost (
      postId: Int!
    ): Post
  }

`;


// Think of this as a database table of rows
  { id: 1, firstName: 'Tom', lastName: 'Coleman' },
  { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
  { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
];

// Think of this as a database table of rows
const posts = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
  { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
  { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
  { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 },
];

// Think of this as a database table of rows
const cards = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
  { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
  { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
  { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 },
];

// Think of this as a database table of rows
const sections = [
  { id: 1,  dashboardId: 1, title: 'Analytics', text:'Summarized company performance'},
  { id: 2,  dashboardId: 1, title: 'Support Requests', text:'Open ticket summary'},
  { id: 3,  dashboardId: 1, title: 'Sales Summary', text:'Overview of current month'},

  { id: 4,  dashboardId: 2, title: 'Task Overview', text:'Overview of today\'s taks.'},
  { id: 5,  dashboardId: 2, title: 'Email Campaigns', text:'Overview of active email campaigns'},
  { id: 6,  dashboardId: 2, title: 'Welcome to Meteor', text:''},

  { id: 7,  dashboardId: 3, title: 'Ongoing Projects', text:'Overview of current month'},
  { id: 8,  dashboardId: 3, title: 'Recent Comments', text:'Most recent first'},
  { id: 9,  dashboardId: 3, title: 'Recent Chats', text:'Overview of today\'s conversations.'},

  { id: 10, dashboardId: 4, title: 'Network Analysis', text:'Download vs. Upload Speed'},
  { id: 11, dashboardId: 4, title: 'CPU Temperature', text:'Average temperature of all CPUs.'},
  { id: 12, dashboardId: 4, title: 'Launchpad is Cool', text:''},

  { id: 13, dashboardId: 5, title: 'Conversion Rate', text:'Overview of current month'},
  { id: 14, dashboardId: 5, title: 'Recent Activities', text:'Overview of current week\'s activities.'},
  { id: 15, dashboardId: 5, title: 'Advanced GraphQL', text:''},

  { id: 16, dashboardId: 6, title: 'Launchpad is Cool', text:''},
  { id: 17, dashboardId: 6, title: 'Launchpad is Cool', text:''},
  { id: 18, dashboardId: 6, title: 'Launchpad is Cool', text:''},

  { id: 19, dashboardId: 7, title: 'Introduction to GraphQL', text:''},
  { id: 20, dashboardId: 7, title: 'Welcome to Meteor', text:''},
  { id: 21, dashboardId: 7, title: 'Advanced GraphQL', text:''},

  { id: 22, dashboardId: 8, title: 'Launchpad is Cool', text:''},
  { id: 23, dashboardId: 8, title: 'Introduction to GraphQL', text:''},
  { id: 24, dashboardId: 8, title: 'Welcome to Meteor', text:''},

  { id: 25, dashboardId: 9, title: 'Advanced GraphQL', text:''},
  { id: 26, dashboardId: 9, title: 'Launchpad is Cool', text:''},
  { id: 27, dashboardId: 9, title: 'Introduction to GraphQL', text:''},
];

// Think of this as a database table of rows.
const pages = [

  { id:  1, categoryId:1, title: 'Classic Dashboard' },
  { id:  2, categoryId:1, title: 'Analytical Dashboard' },
  { id:  3, categoryId:1, title: 'Commerce Dashboard' },
  { id:  4, categoryId:1, title: 'Cryptocurrency Dashboard' },
  { id:  5, categoryId:1, title: 'General Dashboard' },
  { id:  6, categoryId:1, title: 'Sales Dashboard' },
  { id:  7, categoryId:1, title: 'Campaign Dashboard' },
  { id:  8, categoryId:1, title: 'Trendy Dashboard' },
  { id:  9, categoryId:1, title: 'Overview Dashboard' },
  { id: 10, categoryId:2, title: 'Interface Cards' },
  { id: 11, categoryId:3, title: 'Card Blocks' },
  { id: 11, categoryId:4, title: 'Icon Fonts' },
  { id: 11, categoryId:5, title: 'Typography' },


];

const categories = [
  { id: 1, title: 'Dashboards'},
  { id: 2, title: 'Interface Cards'},
  { id: 3, title: 'Card Blocks'},
  { id: 4, title: 'Icon Fonts'},
  { id: 5, title: 'Typography'},
];

const resolvers = {

  Query: {
    pages: () => pages,

    posts: () => posts,
    author: (_, { id }) => find(authors, { id }),
  },

  Mutation: {
    upvotePost: (_, { postId }) => {
      const post = find(posts, { id: postId });
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      post.votes += 1;
      return post;
    },
  },

  Author: {
    posts: author => filter(posts, { authorId: author.id }),
  },

  Post: {
    author: post => find(authors, { id: post.authorId }),
  },

  Page: {
    // Page has sections.
    // find all sections with ID of page id
    sections: page => find(sections, { id: page.id }),
  },

};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});

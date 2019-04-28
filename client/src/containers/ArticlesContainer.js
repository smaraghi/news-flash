import React, { Component } from 'react';
import Articles from '../components/Articles';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchingArticles } from '../redux/actions'

class ArticlesContainer extends Component {

  getCategory = () => {
    let category = this.props.location.pathname.split('/')[2]
    return category.charAt(0).toUpperCase() + category.slice(1)
  }

  //makes a call to the backend and sets the articles state to the return value and then that state is mapped to the props of this component 
  componentDidMount(){
    this.props.fetchingArticles(this.getCategory())
  }

  render() { 
    return ( 
      <React.Fragment>
        <h2>Browsing {this.getCategory()}</h2>
        <div className="ui grid container">
          <div className="three column wide centered">
            <div className="ui three stackable cards">
              {this.props.articles.map((article, i) => <Articles key={i} article={article} />)}
            </div>
          </div>
        </div>
      </React.Fragment>
     );
  }
}
 
const mapStateToProps = state => ({
  articles: state.articles 
})

const mapDispatchToProps = dispatch => {
  return {
    fetchingArticles: (category) => dispatch(fetchingArticles(category))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticlesContainer));
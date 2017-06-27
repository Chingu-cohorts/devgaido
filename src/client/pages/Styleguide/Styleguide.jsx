import React from 'react';
import PropTypes from 'prop-types';

const ItemInfoCard = ({ item }) => (
  <div className="card-big">
    <div className="card-big-header card-big-header-lesson">
      <h5 className="card-big-header-text">{item.name}</h5>
      <i className="card-big-header-icon fa fa-info" />
    </div>
    <div className="card-big-content">
      <p>{item.description}</p>
    </div>
  </div>
);

const StyleGuide = () => (
  <div className="container">
    <div className="grid-half">
      <ItemInfoCard item={{ name: 'InfoCard', description: 'InfoCardText' }} />
    </div>
    <h1>H1 Heading</h1>
    <h2>H2 Heading</h2>
    <h3>H3 Heading</h3>
    <h4>H4 Heading</h4>
    <h5>H5 Heading</h5>
    <h6>H6 Heading</h6>
    <hr />
    <p>p</p><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
      sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
      sed diam voluptua.</p>
    <a>Anchor</a>
    <em> Emphasis</em>
    <small> Small</small>
    <strong> Strong</strong>
    <u> Underline</u>
    <blockquote>
      <p><em>This is a blockquote</em></p>
    </blockquote>
    <button>Default Button</button>
    <input type="submit" value="Input Button" />
    <a className="button" href="/">Anchor Button</a>
    <button className="button button-pill">Pill Button</button>
    <button className="button button-primary">Primary Button</button>
    <button className="button button-primary button-pill">Primary Pill Button</button>
    <hr />
    <ul>
      <li>Unordered list item 1</li>
      <li>Unordered list item 2</li>
    </ul>
    <ol>
      <li>Ordered list item 1</li>
      <li>Ordered list item 2</li>
    </ol>
    <dl>
      <dt>Description list item 1</dt>
      <dd>Description list item 1.1</dd>
    </dl>
    <hr />
    <form>
      <fieldset>
        <label htmlFor="nameField">Name</label>
        <input type="text" placeholder="Your Name here" id="nameField" />
        <label htmlFor="ageRangeField">Age Range</label>
        <select id="ageRangeField">
          <option value="0-13">0-13</option>
          <option value="14-17">14-17</option>
          <option value="18-23">18-23</option>
          <option value="24+">24+</option>
        </select>
        <label htmlFor="commentField">Comment</label>
        <textarea placeholder="Hi there …" id="commentField" />
        <div>
          <input type="checkbox" id="confirmField" />
          <label className="label-inline" htmlFor="confirmField">Send a copy to yourself</label>
        </div>
        <input type="submit" value="Send" />
      </fieldset>
    </form>
    <hr />
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Height</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Stephen Curry</td>
          <td>27</td>
          <td>1,91</td>
          <td>Akron, OH</td>
        </tr>
        <tr>
          <td>Klay Thompson</td>
          <td>25</td>
          <td>2,01</td>
          <td>Los Angeles, CA</td>
        </tr>
      </tbody>
    </table>
    <hr />
    <pre><code>
      yarn global add webpack
    </code></pre>
  </div>
  );

ItemInfoCard.propTypes = {
  item: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default StyleGuide;

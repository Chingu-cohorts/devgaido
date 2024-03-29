import React from 'react';
import Helmet from 'react-helmet';
import LazyLoad from 'react-lazyload';

import LinkButton from '../shared/LinkButton';
import AnimateVisibleChildrenDiv from '../shared/AnimateVisibleChildrenDiv';
import Redirect from '../shared/Redirect';

const LoadingPlaceholder = () => (
  <div className="loading__placeholder home-img__loading-spinner loading-spinner border-round" />
);

const Home = () => (
  <div>
    <Helmet title="Home" />
    <div
      className="home-hero flex items-center justify-center bg-cover relative"
      style={{ backgroundImage: "url('/img/compass.jpg')" }}
    >
      <div className="flex items-center justify-center bg-primary-25 width-100 height-100">
        <AnimateVisibleChildrenDiv
          speed={0.7}
          stagger={0.1}
          className="flex flex-wrap width-60 width-70-below-d1 width-90-below-t"
        >
          <h1 className="h2-below-d1 h3-below-t c-white width-100 text-shadow-subtle">
            LEARN WEB DEVELOPMENT
          </h1>
          <h1 className="h2-below-d1 h3-below-t c-accent margin-bottom-big margin-bottom-small-below-t width-100 text-shadow-subtle">
            THE DEVGAIDO WAY
          </h1>
          <p className="h4 h5-below-d1 c-white opacity-90">
            Whether you&#039;re just starting out or want to brush up a certain
            skill:
          </p>
          <p className="h4 h5-below-d1 c-white opacity-90">
            <span className="c-accent bold">devGaido</span> provides easy to
            follow learning paths that help you reach your goal without the
            hassle.
          </p>
          <p className="h4 h5-below-d1 c-white opacity-90">
            Never worry about learning the wrong stuff from subpar resources
            ever again!
          </p>
          <div className="margin-top-small width-100">
            <LinkButton
              className="button--primary"
              icon="icon-sign-in"
              href="/signup"
            >
              Sign Up Now
            </LinkButton>
            <LinkButton
              className="button--white-clear"
              icon="icon-search"
              href="/library"
            >
              Explore Library
            </LinkButton>
          </div>
        </AnimateVisibleChildrenDiv>
      </div>
    </div>
    <AnimateVisibleChildrenDiv
      speed={0.7}
      stagger={0.2}
      alternate
      className="container"
    >
      <section className="flex flex-column-below-t margin-top-huge">
        <LazyLoad once placeholder={<LoadingPlaceholder />}>
          <img
            className="width-50 width-100-below-t height-auto border-round"
            src="/img/discover.jpg"
            alt=""
            srcSet="/img/discover.jpg, 320w, /img/discover.jpg, 640w, /img/discover.jpg, 1280w"
            sizes="(max-width: 320px) 15vw, (max-width: 480px) 50vw, (max-width: 900px) 75vw, 100vw"
          />
        </LazyLoad>
        <div className="margin-left-small margin-left-0-below-t margin-top-small width-50 width-100-below-d">
          <h1 className="h2-below-d1 h3-below-t c-accent wider">Discover</h1>
          <p>
            Whether you are a new Web Developer seeking to gain broader skills
            or an experienced developer who wants to fill a specific gap - let
            devGaido help you discover what you need to know.
          </p>
        </div>
      </section>
      <section className="flex flex-column-below-t margin-top-huge">
        <div className="margin-right-small margin-top-small right order-2-below-t width-50 width-100-below-t">
          <h1 className="h2-below-d1 h3-below-t c-primary wider right">
            Learn
          </h1>
          <p className="margin-left-auto">
            Follow a learning path that is geared to what you want and need to
            know to become a better Web Developer. We&#039;ve done the work of
            plotting a course to your goals so you can focus on learning.
          </p>
        </div>
        <LazyLoad once placeholder={<LoadingPlaceholder />}>
          <img
            className="width-50 width-100-below-t height-auto border-round order-1-below-t"
            src="/img/learn.jpg"
            alt=""
            srcSet="/img/learn.jpg, 320w, /img/learn.jpg, 640w, /img/learn.jpg, 1280w"
            sizes="(max-width: 320px) 15vw, (max-width: 480px) 50vw, (max-width: 900px) 75vw, 100vw"
          />
        </LazyLoad>
      </section>
      <section className="flex flex-column-below-t margin-top-huge">
        <LazyLoad once placeholder={<LoadingPlaceholder />}>
          <img
            className="width-50 width-100-below-t height-auto border-round"
            src="/img/practise.jpg"
            alt=""
            srcSet="/img/practise.jpg, 320w, /img/practise.jpg, 640w, /img/practise.jpg, 1280w"
            sizes="(max-width: 320px) 15vw, (max-width: 480px) 50vw, (max-width: 900px) 75vw, 100vw"
          />
        </LazyLoad>
        <div className="margin-left-small margin-left-0-below-t margin-top-small width-50 width-100-below-t ">
          <h1 className="h2-below-d1 h3-below-t c-accent wider">Practice</h1>
          <p>
            Practice makes perfect! devGaido&#039;s learning paths include
            strategically placed exercises and quizzes so you can reinforce your
            newfound knowledge and understanding.
          </p>
        </div>
      </section>
      <section className="flex flex-column-below-t margin-top-huge margin-bottom-huge">
        <div className="margin-right-small margin-top-small right order-2-below-t width-50 width-100-below-t">
          <h1 className="h2-below-d1 h3-below-t c-primary wider right">
            Build
          </h1>
          <p className="margin-left-auto">
            Challenges and projects are included to help you achieve a deep and
            comprehensive understanding of how to use the languages, libraries,
            tools, and techniques necessary to be a Web Developer.
          </p>
        </div>
        <LazyLoad once placeholder={<LoadingPlaceholder />}>
          <img
            className="width-50 width-100-below-t height-auto border-round order-1-below-t"
            src="/img/build.jpg"
            alt=""
            srcSet="/img/build.jpg, 320w, /img/build.jpg, 640w, /img/build.jpg, 1280w"
            sizes="(max-width: 320px) 15vw, (max-width: 480px) 50vw, (max-width: 900px) 75vw, 100vw"
          />
        </LazyLoad>
      </section>
    </AnimateVisibleChildrenDiv>
  </div>
);

export default Redirect(Home, true, '/dashboard');

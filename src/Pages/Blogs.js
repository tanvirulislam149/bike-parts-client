import React from 'react';

const Blogs = () => {
    return (
        <div>
            <p className='text-4xl text-center text-accent-focus'>Question & Answer</p>
            <p>1) Que:  How will you improve the performance of a React Application?</p>
            <p>Ans: React compares the actual changes with virtual DOM which is saved in a state. So when the state is changed the children components re-renders. This makes an app slower. so we should use siblings components instead of children to optimize performance. Beside this, we can use React.memo() to memoizing a component. That means any component which is not need rendering will use previous rendered value to optimize performance.</p>
            <p>2) Que: What are the different ways to manage a state in a React application?</p>
            <p>Ans: There are 4 kinds of state in react and they are needed to manage differently. To manage local state, we can use simply useState. It is so easy and can be send to any child component easily. State that can be accessed from any component is global and to manage this, we can use Context API, Although it is not a state manager.  </p>
            <p>3) Que: How does prototypical inheritance work?</p>
            <p>Ans: All the JavaScript object holds a link by which object remains connected like a chain. When you try to access a object, you will see get another object by prototypical inheritance. It means object inherited from another. And you will get so many objects in a chain until it null. All the objects stay connected like chain and can be accessed by inheritance.</p>
            <p>4) Que:  Why you do not set the state directly in React. For example, if you have const [products, setProducts] = useState([]). Why you do not set products = [...] instead, you use the setProducts?</p>
            <p>Ans: React follows a unidirectional data flow. That means you can only set value of state in one direction and that is by setState. Because React always compares previous data with new data and save the changes and re-renders it. But if you set data directly to a state in won't be able to compare and for this many problems can happen like app crash and etc.   </p>
            <p>5) Que: What is a unit test? Why should write unit tests?</p>
            <p>Ans: Unit testing is a software testing system which is performed to watch if a software is working perfectly as expected or not. A unit can be a individual function, module , object etc. The part is needed to test in development process is unit. Unit testing is important because by it we check everything.  </p>
        </div>
    );
};

export default Blogs;
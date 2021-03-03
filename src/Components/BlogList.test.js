import { render } from '@testing-library/react';
import BlogList from "./BlogList";

test('it renders without crashing', () => {
    render(<BlogList />)
});
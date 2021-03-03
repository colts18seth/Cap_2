import { render } from '@testing-library/react';
import Post from "./Post";

test('it renders without crashing', () => {
    render(<Post />)
});
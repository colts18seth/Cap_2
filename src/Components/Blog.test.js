import { render } from '@testing-library/react';
import Blog from "./Blog";

test('it renders without crashing', () => {
    render(<Blog />)
});
import { render } from '@testing-library/react';
import NewPostTitle from "./NewPostTitle";

test('it renders without crashing', () => {
    render(<NewPostTitle />)
});
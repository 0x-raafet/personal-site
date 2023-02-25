import { styled } from '@linaria/react'
import NextLink from 'next/link'

export default function TagsSection({ items, selected }) {
  return (
    <Wrapper>
      <TagSectionTitle>Tags: </TagSectionTitle>
      <TagGroup>
        {items.map((singleTag, idx) => (
          <NextLink key={idx + '_' + singleTag} href={`/tags/` + singleTag} style={{ textDecoration: 'none' }} passHref prefetch={false}>
            <Tag isSelected={singleTag === selected}>{singleTag}</Tag>
          </NextLink>
        ))}
      </TagGroup>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-bottom: 50px;
`

const TagSectionTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`

const TagGroup = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 48em) {
    gap: 10px;
  }
`

const Tag = styled.p`
  background: ${(props) => (props.isSelected ? 'var(--primary)' : 'hsl(0deg, 0%, 100%)')};
  color: ${(props) => (props.isSelected ? 'white' : 'hsl(210deg, 30%, 8%)')};
  padding: 10px;
  font-size: 16px;
  transition: 0.1s all;
  cursor: pointer;
  text-transform: capitalize;

  &:hover {
    color: ${(props) => (props.isSelected ? 'white' : 'var(--primary)')};
    text-decoration: underline;
  }
`
